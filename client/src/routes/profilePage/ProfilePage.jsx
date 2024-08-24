import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profilePage.scss";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";

function ProfilePage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user") === null) {
            navigate("/login");
        }
    }, [navigate]);
    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            localStorage.removeItem("user");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (localStorage.getItem("user") === null) {
        return null; 
    }

    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <button>Update Profile</button>
                    </div>

                    <div className="info">
                        <span>Avatar</span> <img src="imds" alt="" />
                        <span>
                            Username: <b>Jhon Doe </b>
                        </span>
                        <span>
                            Email: <b>jhon@gmail.com</b>
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                    <div className="title">
                        <h1>My Lists</h1>
                        <button>Create New Posts</button>
                    </div>
                    <List />
                    <div className="title">
                        <h1>Saved Lists</h1>
                    </div>
                    <List />
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
