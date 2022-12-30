const userModel = require('./user.model');
const bcrypt = require('bcrypt');
const config = require("../../config/config");
const jwt = require('jsonwebtoken');

const secreateKey = config.SECRETKEY;
module.exports = {

    createuser: async(req, res) => {
        try {
            let gmail = await userModel.findOne({
                email: req.body.email
            });

            if (gmail) {
                return res.status(400).json({
                    message: "This email is already exist"
                })
            }

            let user = new userModel(req.body);

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
            const createdUser = await user.save();

            if (createdUser) {
                res.status(200).json({
                    result: true,
                    message: "your account is successfully created",
                });
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    login: async(req, res) => {

        try {

            let user = await userModel.findOne({
                email: req.body.email
            });

            if (!user) {
                return res.status(400).json({
                    message: "User does not exist"
                });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: "Incorrect Password !"
                });
            }
            const payload = { subject: user._id };
            const token = jwt.sign(payload, secreateKey);

            res.status(200).json({ result: true, token: token, userName: user.fullName, role: user.role });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateUserByID: async(req, res) => {

        try {

            const userDetails = req.body;

            if (userDetails.password) {
                const salt = await bcrypt.genSalt(10);
                userDetails.password = await bcrypt.hash(userDetails.password, salt);
            }

            const updatedUserData = await userModel.findByIdAndUpdate(req.params.id, { $set: userDetails }, { new: true });

            if (updatedUserData) {
                res.status(200).send({
                    result: true,
                    message: "User Details updated successfully"
                });
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getUserByID: async(req, res) => {

        try {
            const user_details = await userModel.findById(req.params.id);
            if (!user_details) {
                return res.status(208).send({ result: false, message: "Invalid user Id..." });
            }
            user_details.password = "";
            res.status(200).json({ result: true, message: user_details });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAllUserData: async(req, res) => {
        try {
            const userData = await userModel.find();

            if (userData) {
                res.status(200).json({ result: true, data: userData })
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteUserByID: async(req, res) => {

        try {
            const deletedUser = await userModel.findByIdAndDelete(req.params.id);
            if (deletedUser) {
                res.status(200).json({ result: true, message: "User deleted successfully..." });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}