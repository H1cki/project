const User = require('../models/user');
var signupPost = (req, res) => {
    if (!req.body) return response.sendStatus(400);
    let userName = req.body.login;
    let userPassword = req.body.password;
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    User.create({
        firstName: firstName,
        lastName: lastName,
        login: userName,
        password: userPassword
    }, function (err, doc) {
        if (err) return console.log(err);
        console.log("Сохранен объект user", doc);
        return res.status(200).json('sdsds');

    });

}

const signupGet = (req, res) => {
    res.render('../public/signup')
}

module.exports = {
    signupGet,
    signupPost
};