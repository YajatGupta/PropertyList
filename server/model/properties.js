const dbmodel = require('../utilities/connection');

const properties = {}

properties.getAllProperties = () => {
    console.log("getAllProperties");
    return dbmodel.getPropertyCollection().then(model => {
        return model.find().then(data => {
            if (data.length > 0) return data;
            return new Error("No Properties to Show, Add some");
        })
            .catch(err => {
                throw err;
            })
    }).catch(err => {
        throw err;
    })
}

properties.getPropertiesByUser = (userID) => {
    return dbmodel.getPropertyCollection().then(model => {
        return model.find({ userID: userID }).then(data => {
            if (data) return data;
            throw new Error("No properties to show, Add some");
        }).catch(err => {
            throw err;
        })
    }).catch(err => {
        throw err;
    })
}

properties.addProperty = (property) => {
    return dbmodel.getPropertyCollection().then(model => {
        return model.create(property).then(data => {
            if (data){console.log("data returned"); return property.propertyName;}
            throw new Error("Something Went Wrong");
        }).catch(err => {
            throw err;
        })
    }).catch(err => {
        throw err;
    })
}

properties.updateProperty = (userID,property) => {
    return dbmodel.getPropertyCollection().then(model => {
        return model.updateOne(
            {userID:userID,_id:property.propertyID},
            {$set : {
                propertyName:property.propertyName,
                propertyRating:property.propertyRating,
                propertyPrice:property.propertyPrice,
                propertyAmenities:property.propertyAmenities,
                propertyImage:property.propertyImage
            }}).then(data=>{
                if (data) return property.propertyName;
                throw new Error("Something Went Wrong");
            })
            .catch(err=>{
                throw err;
            })
    }).catch(err=>{
        throw err;
    })
}

module.exports = properties;