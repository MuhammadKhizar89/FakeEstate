import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import prisma from '../lib/prisma.js';
export const register = async (req, res) => {
    try {
        //db operations
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        console.log(newUser);
        res.status(201).json({ message: "User Created Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user. Something went wrong" });
    }
}
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (user && await bcrypt.compare(password, user.password)) {
        const age = 1000 * 60 * 60 * 24 * 7;
            const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:age});
const {password, ...userInfo} = user

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: age
            }).status(200).json(userInfo);
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const logout = (req, res) => {
    //db operations
res.clearCookie("token").status(200).json({ message: "Logout Successful" });
}   