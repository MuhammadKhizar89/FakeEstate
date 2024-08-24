import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Not Authenticated");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Not Authenticated");
        req.userId = user.id;
        console.log("payload", user);
        next();
    });
}