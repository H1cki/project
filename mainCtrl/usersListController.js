const User = require('../models/user');


var usersListGet = (req, res) => {
    
   
    var perPage = 9
    var page = req.params.page || 1

    User
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, Result) {
            User.count().exec(function (err, count) {
                if (err) return next(err)
                 const table =  res.render('../public/usersList', {
                    users: Result,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
              
                
            })
        })

};

module.exports = {
    usersListGet

};
/*User.findOneAndUpdate({Age:3},{$set:{Role:"Admin"}},  function(err, result){
                 
    console.log(result);
    
})*/