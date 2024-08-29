import {Suspense, useContext, useEffect} from "react";
import {Await, Link, Navigate, useLoaderData, useNavigate} from "react-router-dom";
import "./profilePage.scss";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import {AuthContext} from "../../context/AuthContext";

function ProfilePage() {
    const data = useLoaderData();
    console.log(data);
    const {updateUser, currentUser} = useContext(AuthContext);
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

                        <Link to="/profile/update">
                            {" "}
                            <button>Update Profile</button>
                        </Link>
                    </div>

                    <div className="info">
                        <span>Avatar</span> <img src={currentUser.avatar || "/noavatar.png"} alt="" />
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
                        <Link to="/add">
                            <button>Create New Posts</button>
                        </Link>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await resolve={data.postResponse} errorElement={<div>Error Loading Posts!</div>}>
                            {(postResponse) => {
                                console.log(postResponse.data.userPosts);
                                return <List listData={postResponse.data.userPosts} />;
                            }}
                        </Await>
                    </Suspense>

                    <div className="title">
                        <h1>Saved Lists</h1>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await resolve={data.postResponse} errorElement={<div>Error Loading Posts!</div>}>
                            {(postResponse) => {
                                console.log(postResponse.data.userPosts);
                                return <List listData={postResponse.data.savedPosts} />;
                            }}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await resolve={data.chatResponse} errorElement={<div>Error Loading Chats!</div>}>
                            {(chatResponse) => {
                                console.log("Chat=-",chatResponse.data);
                             return <Chat chats={chatResponse.data}/>;
                            }}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
