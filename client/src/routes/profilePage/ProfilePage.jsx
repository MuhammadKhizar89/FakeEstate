import './profilePage.scss';
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";

function profilePage() {
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

export default profilePage;
