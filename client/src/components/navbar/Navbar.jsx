import {useContext, useState} from "react";
import "./navbar.scss";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Navbar() {
    const [open, setOpen] = useState(false);
    const user = true;
    const {currentUser} = useContext(AuthContext);

    return (
        <nav>
            <div className="left">
                <a href="/" className="logo">
                    <img src="./logo.png" alt="logo" />
                    <span>RealEstate</span>
                </a>
                <a href="/">Home</a>
                <Link to="/list">Explore</Link>
                <a href="/">Contact</a>
                <a href="/">Agents</a>
            </div>
            <div className="right">
                {currentUser ? (
                    <div className="user">
                        <img src={currentUser.avatar||"/noavatar.png"} alt="PIC" />
                        <span>{currentUser.username}</span>
                        <Link to="/profile" className="profile">
                        <div className="notification">3</div>
                        <span>Profile</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <a href="/login">Sign in</a>
                        <a href="/register" className="register">
                            Sign Up
                        </a>
                    </>
                )}
                <div className="menuIcon">
                    <img src="./menu.png" alt="" onClick={() => setOpen(!open)} />
                </div>
                <div className={open ? "menu active" : "menu "}>
                    <a href="/">Home</a>
                    <Link href="/list">Explore</Link>
                    <a href="/">Contact</a>
                    <a href="/">Agents</a>
                    <a href="/">Sign In</a>
                    <a href="/">Sign Up</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
