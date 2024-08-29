import {useEffect, useState} from "react";
import "./chat.scss";
import apiRequest from "../../lib/apiRequest";
function Chat({chats}) {
    const [chat, setchat] = useState(null);
    const handleOpenChat = async (id,receiver) => {
        try {
            console.log(id);
            const res=await apiRequest.get(`/chats/${id}`);
            console.log(res.data);
            setchat({...res.data,receiver:receiver});
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        console.log(chat);
    }, [chat]);

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
                            <span><img src={chat.receiver.avatar||"/noavatar.png"} alt="" /></span><span> {chat.receiver.username}</span></div>
                        <span className="close" onClick={() => setchat(null)}>
                            X
                        </span>
                    </div>
                    <div className="center">
                        <div className="chatMessage">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage own">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage own">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                            <span>1 hour ago</span>
                        </div>
                    </div>
                    <div className="bottom">
                        <textarea></textarea>
                        <button>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
