const dbmodel = require('../utilities/connection');

const userDB = {};

userDB.getUser = (username) => {
    return dbmodel.getUserCollection().then(model=>{
        console.log("connected user model");
        return model.findOne({userID:username},{_id:0})
        .then(data=>{
            console.log("data2",data);
            if(data) return data.password;
            let error = new Error("Invalid username or password");
            error.status(404);
            throw error;
        })
        .catch(err=>{
            throw err;
        })
    })
}

module.exports = userDB;