import prisma from "../lib/prisma.js";
import bcrypt from 'bcrypt';
export const getUsers = async (req, res) => {
    try {
        res.send("Get all users")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get users. " })
    }
}
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        })
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get user. " })
    }
}
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...body } = req.body;
    if (tokenUserId !== id) return res.status(401).json({ message: "Unauthorized" });
    let updatedPassword = null;
    try {
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }
        console.log(req.body);
        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                ...body,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }),
            },
        })
        console.log(updateUser)
        const { password: pw, ...updateUserWithoutPassword } = updateUser

        res.status(200).json(updateUserWithoutPassword);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update User." })
    }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    if (tokenUserId !== id) return res.status(401).json({ message: "Unauthorized" });
    try {
        await prisma.user.delete({
            where: { id },
        })
        res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete User." })
    }
}
export const savePost = async (req, res) => {
    const postId = req.body.postId;
    console.log(postId);
    const tokenUserId = req.userId;
    console.log("hehe",tokenUserId);

    try {
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId: postId
                }
            },
        })
        console.log("savedPost",savedPost);
        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    userId_postId: {
                        userId: tokenUserId,
                        postId: postId
                    }
                }
            })
            res.status(200).json({ message: "Post Removed From saved List" });
        } else {
            const abc=await prisma.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId
                }
            })
            console.log(abc);
            res.status(200).json({ message: "Post Added To saved List" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete User." })
    }
}
export const profilePosts = async (req, res) => {
    console.log("not this",req.userId);
    const tokenUserId = req.userId;
    try {
        const userPosts = await prisma.post.findMany({
            where: { userId: tokenUserId },
        })
        const saved = await prisma.savedPost.findMany({
            where: { userId: tokenUserId },
            include: {
                post: true,
            }
        })
        const savedPosts = saved.map((item) => {
            return item.post
        })
        res.status(200).json({ userPosts, savedPosts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get Posts. " })
    }
}

