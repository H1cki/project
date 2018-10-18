var jwt = require('jsonwebtoken');
const User  = require("../models/user");

const checkAuth = (req, res, next) => {
    const { cookie } = req.headers;
   
    var decoded = jwt.verify(cookie, "shhhhh", function(err, decoded) {
        if (err) {
            return res.status(401).send('Oops')
        }
        let userId = decoded.foo
        User.findOne({ _id: userId}, (err, docs)=>{
            if(err){
            console.log(err);
            }
            req.user = docs;
            next();
        });
     

      });
}
module.exports = {
    checkAuth
};
	
