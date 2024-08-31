import {useContext, useEffect, useState} from "react";
import "./chat.scss";
import apiRequest from "../../lib/apiRequest";
import {format} from "timeago.js";
import {AuthContext} from "../../context/AuthContext";
import {SocketContext} from "../../context/SocketContext";
function Chat({chats}) {
    const [chat, setchat] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const {socket} = useContext(SocketContext);

    const handleOpenChat = async (id, receiver) => {
        try {
            console.log(id);
            const res = await apiRequest.get(`/chats/${id}`);
            console.log(res.data);
            setchat({...res.data, receiver: receiver});
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");
        console.log(text, currentUser);
        if (!text) {
            return;
        }
        try {
            const res = await apiRequest.post(`/messages/${chat.id}`, {text});
            setchat((prev) => ({...prev, messages: [...prev.messages, res.data]}));
            socket.emit("sendMessage", {receiverId: chat.receiver.id, data: res.data});
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const read = async () => {
            try {
                await apiRequest.put(`/chats/read/${chat.id}`);
            } catch (error) {
                console.log(error);
            }
        };
    
        const handleMessage = (data) => {
            if (chat.id === data.chatId) {
                setchat((prev) => ({
                    ...prev, 
                    messages: [...prev.messages, data.message]
                }));
                read();
            }
        };
    
        if (socket && chat) {
            socket.on("getMessage", handleMessage);
        }
    
        return () => {
            if (socket) {
                socket.off("getMessage", handleMessage);
            }
        };
    }, [socket, chat]);
    

    console.log(chats);

    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                {chats.map((chat) => (
                    <div onClick={() => handleOpenChat(chat.id, chat.receiver)} key={chat.id} className="message">
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
                            <span>
                                <img src={chat.receiver.avatar || "/noavatar.png"} alt="" />
                            </span>
                            <span> {chat.receiver.username}</span>
                        </div>
                        <span className="close" onClick={() => setchat(null)}>
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
                                className="chatMessage own"
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
