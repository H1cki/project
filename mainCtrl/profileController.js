const User = require('../models/user');
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let profilePost = function (req, res) {
    if (!req.body) return res.sendStatus(400);
    let userLogin = req.user.login
    let userFirstName = req.body.firstName
    let userLastName = req.body.lastName
    let userAge = req.body.userAge
    let userRole = req.body.userRole
    const payload = {
        firstName: userFirstName,
        lastName: userLastName,
        Age: userAge,
        Role: userRole,
    }
    if (req.file) {
        let img = req.file.path
        payload.Avatar = img.split("public/")[1];
    }
    User.findOneAndUpdate(
        { login: userLogin }, 
        payload, 
        { new: true }, 
        function (err, result) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ user: result });
    });

}
let profileGet = (req, res) => {
    res.render('profile', { user: req.user })
}
module.exports = {
    profileGet,
    profilePost
};