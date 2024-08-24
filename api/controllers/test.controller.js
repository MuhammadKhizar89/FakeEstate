import jwt from "jsonwebtoken";
export const shouldBeLoggedIn = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Not Authenticated");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Not Authenticated");
        req.user = user;
        next();
    });
}
export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Not Authenticated");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).send("Not Authenticated");
        if(!payload.isAdmin) return res.status(403).send("Not Authenticated");
    });

}