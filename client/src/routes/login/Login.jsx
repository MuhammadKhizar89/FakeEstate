import {Link, useNavigate} from "react-router-dom";
import "../register/register.scss";
import apiRequest from '../../lib/apiRequest';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
function Login() {
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const {updateUser}=useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");
        console.log(username, password);
        try{
            const res = await apiRequest.post("/auth/login", {
                username,
                password,
            });
            updateUser(res.data);
            navigate("/");
        }catch(err){
            console.log(err);
            setError(err.response.data.message);
        }


    };
    return (
        <div className="register">
            <div className="formContainer">
                <form style={{width: "500px"}} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="password" type="password" placeholder="Password" />
                    <p>{error}</p>
                    <button>Login</button>
                    <Link id="link" to="/register">
                        Don`t have an account?
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
