const jwtUtil = require('../utils/jwtUtil');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length);
        try {
            const decoded = jwtUtil.verifyToken(token);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
};