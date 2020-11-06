const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const signToken = id => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createJWT = (userId, statusCode, message, res) => {

    const token = signToken(userId);

    res.cookie('jwt', token, {
        expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRY_DT * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true
    });

    res.status(statusCode).json({
        status: true,
        message
    });
};

exports.signUp = async (req, res) => {
    try {

        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password ) {
            return res.status(400).json({ status: false, message: 'Invalid data.'});
        }
        
        const user= User({
            fullName,
            email,
            pass: password,
            agvaId : `agva${Math.floor(100000 + Math.random() * 900000)}`
        });
    
        await user.save();

        console.log(`Virtual pass = ${user.pass}`);

        createJWT(user._id, 201, `User signed up successfully. Your UID is ${user.agvaId}`, res);

       
    } catch (err) {

        //handling duplicate key
        if ( err && err.code === 11000 ) {
            return res.status(409).json({ status: false, message: 'Duplicate data found.'});
        }

        console.log(err.message);
        return res.status(500).json({ status: false, message: 'Internal Server Error.'});
    }
};

exports.login = async (req, res) => {
    try {

        const { agvaId, email, password } = req.body;

        if (!email && !agvaId) {
            return res.status(400).json({ status: false, message: 'Please provide atleast your email or AgVa Id.'}); 
        }

        if (!password) {
            return res.status(400).json({ status: false, message: 'Please provide your password.'}); 
        }

        var user;
        if (email) {
            user = await User.findOne({ email }).select('+password');    
        }
        if (agvaId) {
            user = await User.findOne({ agvaId }).select('+password');    
        }
        if (email && agvaId) {
            user = await User.findOne({ $or: [ {email} , {agvaId}] }).select('+password'); 
        }        

        if (!user || !( user.comparePassword(password, user.password))) {
            return res.status(401).json({ status: false, message: 'Incorrect credentials.'}); 
        } 

        createJWT(user._id, 200, 'User logged in successfully.', res);

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ status: false, message: 'Internal Server Error.'});
    }
};

