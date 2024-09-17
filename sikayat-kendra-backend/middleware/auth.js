// const jwt = require('jsonwebtoken');

// const auth = (role) => {
//     return (req, res, next) => {
//         const token = req.header('x-auth-token');
//         if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

//         try {
//             const secret = process.env.JWT_SECRET; // Ensure this is set in your environment
//             const decoded = jwt.verify(token, secret);
//             req.user = decoded;

//             // Check role
//             if (role && req.user.role !== role) {
//                 return res.status(403).json({ msg: 'Access denied' });
//             }

//             next();
//         } catch (err) {
//             res.status(400).json({ msg: 'Token is not valid' });
//         }
//     };
// };

// module.exports = auth;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (role) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ msg: 'No token provided' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (!user) return res.status(401).json({ msg: 'User not found' });
            if (role && user.role !== role) return res.status(403).json({ msg: 'Access denied' });

            req.user = user;
            next();
        } catch (err) {
            res.status(401).json({ msg: 'Invalid token' });
        }
    };
};
