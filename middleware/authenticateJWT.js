const jwt = require('jsonwebtoken');

// Middleware kiểm tra JWT và phân quyền theo role
function verifyToken(req, res, next) {
    const token = req.headers['authorization']; // Lấy token từ header Authorization

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    
    // Loại bỏ "Bearer " nếu có trong Authorization header
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    // Giải mã token và kiểm tra tính hợp lệ
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Lưu thông tin người dùng (bao gồm role) vào req.user
        req.user = decoded;
        next();
    });
}

// Middleware kiểm tra quyền truy cập dựa trên role
function authorizeRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}

module.exports = { verifyToken, authorizeRole };
