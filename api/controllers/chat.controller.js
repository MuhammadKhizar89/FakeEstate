import prisma from "../lib/prisma.js";
export const getChats = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    has: tokenUserId,
                },
            },
        });
        for (const chat of chats) {
            const receivedId = chat.userIDs.find((id) => id !== tokenUserId);
            const receiver = await prisma.user.findUnique({
                where: {
                    id: receivedId,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            });
            chat.receiver = receiver;
        }
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get chats." });
    }
}

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    }
                }
            }
        });
        await prisma.chat.update({
            where: {
                id: req.params.id
            },
            data: {
                seenBy: {
                    push: tokenUserId
                }
            }
        })
        res.status(200).json(chat)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get chat. " })
    }
}
export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chat = await prisma.chat.findFirst({
            where: {
                AND: [
                    {
                        userIDs: {
                            has: tokenUserId
                        }
                    },
                    {
                        userIDs: {
                            has: req.body.receiverId
                        }
                    }
                ]
            }
        });

        if (chat) return res.status(200).json(chat);

        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.receiverId],
            }
        });
        res.status(200).json(newChat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add chat." });
    }
}

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chat = await prisma.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
            seenBy:[tokenUserId]
        })
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get read chat. " })
    }
}

