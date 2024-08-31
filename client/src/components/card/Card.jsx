import {Link, Navigate, useNavigate} from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Card({item}) {
    console.log(item);
    const navigate=useNavigate();
    const {currentUser} = useContext(AuthContext);
    const createMessgae = async () => {
        try {
            await apiRequest.post("/chats/123", {receiverId: item.userId});
            if(!currentUser)
                navigate('/login');
            else
            navigate('/profile');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="card">
            <Link to={`/${item.id}`} className="imageContainer">
                <img src={Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : item.img} alt="" />
            </Link>
            <div className="textContainer">
                <h2 className="title">
                    <Link to={`/${item.id}`}>{item.title}</Link>
                </h2>
                <p className="address">
                    <img src="/pin.png" alt="" />
                    <span>{item.address}</span>
                </p>
                <p className="price">{item.price}</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src="/bed.png" alt="" />
                            <span>{item.bedroom} bedroom</span>
                        </div>
                        <div className="feature">
                            <img src="/bath.png" alt="" />
                            <span>{item.bathroom} bathroom</span>
                        </div>
                    </div>
                   
                   {currentUser.id !== item.userId && <div className="icons">
                        <div className="icon" onClick={() => createMessgae()}>
                            <img src="/chat.png" alt="" />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Card;
