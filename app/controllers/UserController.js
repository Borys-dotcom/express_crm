const User = require("../models/UserModel")

module.exports = {
    create: (req, res) => {
        const newUser = new User(req.body);

        newUser.save()
        .then(() => {
            res.status(200).json({
                message: "user saved successfully."
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: "error while creating new user",
                err: err
            })
        })
    },

    login: (req, res) => {
        // User.findOne();
    }
}