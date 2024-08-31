import {useContext, useEffect, useState} from "react";
import "./chat.scss";
import apiRequest from "../../lib/apiRequest";
import {format} from "timeago.js";
import {AuthContext} from "../../context/AuthContext";
import {SocketContext} from "../../context/SocketContext";

function Chat({chats}) {
    const [chat, setChat] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const {socket} = useContext(SocketContext);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest.get(`/chats/${id}`);
            setChat({...res.data, receiver: receiver});
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");
        if (!text) {
            return;
        }
        try {
            const res = await apiRequest.post(`/messages/${chat.id}`, {text});
            setChat((prev) => ({...prev, messages: [...prev.messages, res.data]}));
            socket.emit("sendMessage", {receiverId: chat.receiver.id, data: {...res.data, chatId: chat.id}});
            e.target.reset();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const readMessages = async () => {
            try {
                await apiRequest.put(`/chats/read/${chat.id}`);
            } catch (error) {
                console.error(error);
            }
        };

        if (socket && chat) {
            socket.on("getMessage", (data) => {
                if (chat.id === data.chatId) {
                    setChat((prev) => ({...prev, messages: [...prev.messages, data]}));
                    readMessages();
                }
            });
        }

        // Clean up the socket listener when the component unmounts or chat changes
        return () => {
            if (socket) {
                socket.off("getMessage");
            }
        };
    }, [socket, chat]);

    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                {chats.map((chat) => (
                    <div
                        onClick={() => handleOpenChat(chat.id, chat.receiver)}
                        key={chat.id}
                        className="message"
                    >
                        <img src={chat.receiver.avatar || "/noavatar.png"} alt="" />
                        <span>{chat.receiver.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                ))}
            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img src={chat.receiver.avatar || "/noavatar.png"} alt="" />
                            <span>{chat.receiver.username}</span>
                        </div>
                        <span className="close" onClick={() => setChat(null)}>
                            X
                        </span>
                    </div>
                    <div className="center">
                        {chat.messages.map((message) => (
                            <div
                                style={{
                                    alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                    textAlign: message.userId === currentUser.id ? "right" : "left",
                                }}
                                className={`chatMessage ${message.userId === currentUser.id ? "own" : ""}`}
                                key={message.id}
                            >
                                <span>{message.text}</span>
                                <p>{format(message.createdAt)}</p>
                            </div>
                        ))}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="bottom">
                        <textarea name="text"></textarea>
                        <button>Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chat;
