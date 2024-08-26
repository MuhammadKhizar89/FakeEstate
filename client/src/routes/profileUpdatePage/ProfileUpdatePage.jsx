import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import "./profileUpdatePage.scss";
import apiRequest from "../../lib/apiRequest";
import {useNavigate} from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
    const {currentUser, updateUser} = useContext(AuthContext);
    const [avatar, setAvatar] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {username, email, password} = Object.fromEntries(formData);
        try {
            setLoading(true);
            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar: avatar[0], // Include the updated avatar URL in the request
            });
            console.log(res.data);
            updateUser(res.data);
            setLoading(false);
            navigate("/profile");
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
        }
    };

    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            defaultValue={currentUser.username}
                            id="username"
                            type="text"
                            placeholder="username"
                            name="username"
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            defaultValue={currentUser.email}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="email"
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input name="password" id="password" type="password" placeholder="password" />
                    </div>
                    <button style={{backgroundColor: `${loading ? "gray" : ""}`}} disabled={loading}>
                        Update
                    </button>
                    {error && <span>{error}</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0]||currentUser.avatar || "/noavatar.png"} alt="" className="avatar" />

                <UploadWidget
                    uwConfig={{
                        cloudName: "dafjumqtg",
                        uploadPreset: "estate",
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: "avatars",
                        setAvatar,
                    }}
                />
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
