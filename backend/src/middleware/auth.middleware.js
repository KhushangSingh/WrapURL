import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "../utils/helper.js"

export const authMiddleware = async (req, res, next) => {
    // Try to get token from cookie or Authorization header
    let token = req.cookies?.accessToken;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    console.log('AuthMiddleware: token found?', !!token);
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });
    try {
        const decoded = verifyToken(token);
        console.log('AuthMiddleware: decoded user id:', decoded);
        const user = await findUserById(decoded);
        if (!user) return res.status(401).json({ message: "Unauthorized: User not found" });
        req.user = user;
        next();
    } catch (error) {
        console.error('AuthMiddleware error:', error);
        return res.status(401).json({ message: "Unauthorized: Invalid token", error: error?.message || error });
    }
}