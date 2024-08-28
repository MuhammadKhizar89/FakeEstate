import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const getPosts = async (req, res) => {
    const query = req.query;
    console.log(query);
    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000000,
                }
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get posts." });
    }
}
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                },
            }
        });
        let userId;
        const token = req.cookies?.token;
        if (!token) {
            userId = null;
        } else {
            jwt.verify(token, process.env.JWT_SECRET, async (err, payLoad) => {
                if (err) {
                    userId = null;
                }
                else {
                    userId = payLoad.id;
                }
            });
        }
        const saved = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId: id
                }
            }
        })

        res.status(200).json({...post, isSaved: saved ? true : false});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get post." });
    }
}

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    console.log(body);
    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                }
            }
        })
        console.log(newPost);
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add post." });
    }
}
export const updatePost = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update post." });
    }
}
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (post.userId !== tokenUserId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await prisma.post.delete({
            where: { id }
        })
        res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete post." });
    }
}