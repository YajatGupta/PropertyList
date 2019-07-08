const Mongoose = require('mongoose');
const {Schema} = require('mongoose');
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const url = "mongodb://User_YG:yajatG264975949@propertylist-shard-00-00-qb9q2.mongodb.net:27017,propertylist-shard-00-01-qb9q2.mongodb.net:27017,propertylist-shard-00-02-qb9q2.mongodb.net:27017/test?ssl=true&replicaSet=PropertyList-shard-0&authSource=admin&retryWrites=true&w=majority";

const propertySchema = Schema({
    propertyName:String,
    propertyRating:Number,
    propertyAmenities:[String],
    propertyPrice:String,
    userID:String,
}, {collection: "Property"})

const userSchema = Schema({
    userID: String,
    password: String
}, {collection: "User"})

let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect(url, {useNewUrlParser:true})
    .then(database=>{
        console.log("connected USER");
        return database.model('User', userSchema)
    })
    .catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getPropertyCollection = () => {
    return Mongoose.connect(url, {useNewUrlParser:true})
    .then(database=>{
        console.log("connected PROPERTIES");
        return database.model('Property', propertySchema)
    })
    .catch(error=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection;