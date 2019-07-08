const userdb = require('../model/users');

const users = {};


users.findUser = (username,password) => {
    return userdb.getUser(username).then(data=>{
        console.log("data",data);
        if(data) return data===password;
    })
    .catch(err=>{
        throw err;
    })
}



module.exports = users;
