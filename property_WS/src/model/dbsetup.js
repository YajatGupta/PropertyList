const collection = require('../utilities/connection');

const userDB = [{
    userID: "yajat",
    password: "yajat",
},
{
    userID: "kunal",
    password: "kunal",
}];

const propertiesDB = [{
        propertyName: "property1",
        propertyRating: 4,
        propertyAmenities: ["parking", "water", "club"],
        propertyPrice: "46lacs",
        userID:"kunal",
    },
    {
        propertyName: "property1",
        propertyRating: 3,
        propertyAmenities: ["parking", "water", "club"],
        propertyPrice: "46lacs",
        userID:"yajat",
    },
    {
        propertyName: "property1",
        propertyRating: 4,
        propertyAmenities: ["parking", "water", "club"],
        propertyPrice: "46lacs",
        userID:"yajat",
    }];

exports.setupDb = () => {
    return collection.getUserCollection().then((user) => {
        return user.deleteMany().then(() => {
            return user.insertMany(userDB).then(() => {
                return collection.getPropertyCollection().then(properties => {
                    return properties.deleteMany().then(() => {
                        return properties.insertMany(propertiesDB).then(data => {
                            if (data) return "Insertion Successfull"
                            else {
                                let err = new Error("Insertion failed");
                                err.status = 400;
                                throw err;
                            }
                        })
                    })
                })

            })
        })
    })
}