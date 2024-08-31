import {createContext, useContext, useEffect, useState} from "react";
export const SocketContext = createContext();
import {io} from "socket.io-client";
import {AuthContext} from "./AuthContext";
export const SocketContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);
    useEffect(() => {
        currentUser && socket?.emit("newUser", currentUser.id);
    }, [currentUser, socket]);

    return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>;
};
