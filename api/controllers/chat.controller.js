import prisma from "../lib/prisma.js";
export const getChats = async (req, res) => {
    try {
        res.send("Get all chats")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get chats. " })
    }
}
export const getChat = async (req, res) => {
    try {
        res.send("Get all chats")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get chat. " })
    }
}
export const addChat = async (req, res) => {
    try {
        res.send("Get all chats")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add chat. " })
    }
}
export const readChat = async (req, res) => {
    try {
        res.send("Get all chats")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get read chat. " })
    }
}

