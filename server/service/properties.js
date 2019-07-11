const propertydb = require('../model/properties');


const properties = {};

properties.addProperty = (property) => {
    return propertydb.addProperty(property)
        .then(data => {
            console.log("data inner")
            return data;
        }).catch(err => {
            throw err;
        })
}

properties.getAllProperties = () => {
    return propertydb.getAllProperties().then(res => {
        return res;
    })
        .catch(err => {
            throw err;
        })
}

properties.updateProperty = (userID,property) => {
    return propertydb.updateProperty(userID,property).then(res=>{
        return res;
    })
    .catch(err=>{
        throw err;
    })
}

properties.getPropertiesByUser = (userID) => {
    return propertydb.getPropertiesByUser(userID)
        .then(data => {
            return data;
        }).catch(err => {
            throw err;
        })
}

module.exports = properties;