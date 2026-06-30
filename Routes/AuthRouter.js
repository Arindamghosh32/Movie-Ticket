const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generatewebtoken } = require('../utils/generatewebtoken');
const { isLoggedin } = require('./../middleware/isLoggedin');

// Render the main login page view
router.get('/', (req, res) => {
    res.render("Login", { alertMessage: null, redirectUrl: null });
});

// --- USER REGISTRATION ROUTE ---
router.post('/register', async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        // Check if the identity matches an existing account
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.render("Login", { 
                alertMessage: "The User is already created. Please Login!", 
                redirectUrl: null 
            });
        }

        // Hash cleartext credentials before cloud commitment
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Commit business entity user object to MongoDB
        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            role
        });

        // Generate JSON Web Token identity signature and drop cookie
        const token = generatewebtoken(user);
        res.cookie("token", token);

        // Calculate direct onboarding trajectory path based on corporate profile role
        const targetHome = (role === 'user') ? '/user/home' : '/owner/create';

        // Render the view, trigger the success browser alert, then forward the developer/user
        return res.render("Login", {
            alertMessage: "User Created Successfully!",
            redirectUrl: targetHome
        });

    } catch (err) {
        console.log("================ REGISTRATION ERROR ================");
        console.error(err);
        console.log("====================================================");
        return res.render("Login", { 
            alertMessage: "Registration failed due to an internal server error.", 
            redirectUrl: null 
        });
    }
});

// --- USER LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.render("Login", { 
                alertMessage: "Invalid email or password", 
                redirectUrl: null 
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = generatewebtoken(user);
            res.cookie("token", token);
            
            if (user.role === 'user') {
                return res.redirect('/user/home');
            } else {
                return res.redirect('/owner/create');
            }
        } else {
            return res.render("Login", { 
                alertMessage: "Invalid email or password", 
                redirectUrl: null 
            });
        }
    } catch (err) {
        return res.render("Login", { 
            alertMessage: "Login connection dropped.", 
            redirectUrl: null 
        });
    }
});

// --- USER LOGOUT ROUTE ---
router.get('/logout', isLoggedin, (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
});

module.exports = router;