import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./profilePage.scss";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
    const {updateUser,currentUser}=useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            localStorage.removeItem("user");
            updateUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <button>Update Profile</button>
                    </div>

                    <div className="info">
                        <span>Avatar</span> <img src={currentUser.avatar||"/noavatar.png"} alt="" />
                        <span>
                            Username: <b>{currentUser.username} </b>
                        </span>
                        <span>
                            Email: <b>{currentUser.email}</b>
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
