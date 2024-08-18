import jwt from "jsonwebtoken";

export const JWTverifier = (req, res, next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log(authHeader)
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if (err) {
            return res.status(403).json({message: "Forbidden"})
        }
        req.id = decoded.id;
        req.roles = decoded.roles;
        next();
    })
}