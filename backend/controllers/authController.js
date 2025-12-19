import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { fullname, username, email, password } = req.body;

        // 1. (Logic to save user to MongoDB goes here later)
        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error('User already exists');
            error.status = 400;
            return next(error); // 🛡️ Pass to your app.js error handler
        }

        // 2. Create and Save User
        // The password will be hashed automatically by our Model's 'pre-save' hook!
        const user = await User.create({
            fullname,
            username,
            email,
            password
        });

        // 2. Create a Real JWT Token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // 🛡️ SECURITY OPTIMIZATION: Implement HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript from reading the token (Protects from XSS)
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict', // Prevents CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(201).json({
            status: 'success',
            message: "User signed up successfully",
            user: {
                fullname: user.fullname,
                id: user.id,
                username: user.username,
                email: user.email
             }
        });
    } catch (error) {
        // res.status(500).json({ message: error.message });
        // 2. Instead of res.status(500), pass it to the global handler
        next(error);
    }
};