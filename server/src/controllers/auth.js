const db = require('../db');
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');

exports.getUsers = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT id, email FROM users');
        return res.status(200).json({
            success: true,
            users: rows,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: 'An error occurred while fetching users.',
        });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email is already in use.',
            });
        }

        const hashedPassword = await hash(password, 10);
        await db.query('INSERT INTO users(email, password) VALUES ($1, $2)', [email, hashedPassword]);

        return res.status(201).json({
            success: true,
            message: 'Registration was successful.',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    let user = req.user;

    let payload = {
        id: user.id,
        email: user.email,
    };

    try {
       
        const token = await sign(payload, SECRET, { expiresIn: '1h' });

        return res.status(200)
            .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            .json({
                success: true,
                message: 'Logged in successfully',
            });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};

exports.protected = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access',
            });
        }

        return res.status(200).json({
            info: 'Protected info',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        return res.status(200)
            .clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            .json({
                success: true,
                message: 'Logged out successfully',
            });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};
