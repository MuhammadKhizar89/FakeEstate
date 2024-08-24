import {Link, useNavigate} from "react-router-dom";
import "../register/register.scss";
import apiRequest from '../../lib/apiRequest';
import { useState } from "react";
function Login() {
    const [error,setError]=useState("");
    const navigate=useNavigate();
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
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/");
        }catch(err){
            console.log(err);
            setError(err.response.data.message);
        }


    };
    return (
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="password" type="password" placeholder="Password" />
                    <p>{error}</p>
                    <button>Login</button>
                    <Link id="link" to="/register">
                        Don't have an account?
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
