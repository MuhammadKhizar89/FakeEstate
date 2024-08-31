import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const newSocket = io("http://localhost:4000", {
                query: { userId: currentUser.id },
            });
            setSocket(newSocket);

            // Clean up the socket connection when the component unmounts or user changes
            return () => {
                newSocket.disconnect();
            };
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser && socket) {
            socket.emit("newUser", currentUser.id);
        }
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
