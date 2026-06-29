const jwt = require('jsonwebtoken')

// 🟢 Added user.role to the token payload object
const generatewebtoken = (user) => {
    return jwt.sign(
        { 
            email: user.email, 
            id: user._id, 
            role: user.role 
        }, 
        process.env.JWT_KEY
    );
}

module.exports = { generatewebtoken }