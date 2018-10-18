const User = require('../models/user');



let Search = (req, res) => {
    var perPage = 9
    var page = req.params.page || 1
    let result = "";   
    let direction = req.query.direction;
    let nameDirection = req.query.field_name;
    let activePage = req.query.current_page;
    let where = {}
       let regular = new RegExp(req.query.searchField, "i");
       where = {
           $or: [
               { firstName: { $regex: regular } },
               { lastName: { $regex: regular } },
               { login: { $regex: regular } },
               { Age: { $regex: regular } },
               { Role: { $regex: regular } }
           ]
       }
       



    if(direction){
       
       if ((direction == "nosort") || (direction == "endsort")){
             result=nameDirection;

       } else{
             result="-"+nameDirection 
       }
    }
    if(activePage){
        page = activePage;
    }

    User
        .find(where)
        .sort(result)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, Result) {
            User.count(where).exec(function (err, count) {
                if (err) return next(err)
                 res.render('../public/sort', {
                    users: Result,
                    current: page,
                    pages: Math.ceil(count / perPage)
                   
                },)
            

            })
        })

}

// console.log('list', list);

// return res.status(200).json({ users: NameArray });
module.exports = {
    sortGet: Search
};
