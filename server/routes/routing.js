const express = require('express');
const router = express.Router();
const users = require('../service/users');
const setup = require('../model/dbsetup');
const properties = require('../service/properties');

router.get('/setupDB', (req, res) => {
    setup.setupDb().then(response => {
        res.json({ "message": response });
        res.end();
    })
        .catch(err => {
            res.json({ "message": "Insertion Unsuccessful, Please try again" });
            res.end();
        })
})

router.post('/Login', (req, res) => {
    console.log(req.body);
    let username = String(req.body.custID);
    let password = String(req.body.password);
    users.findUser(username, password).then(response => {
        console.log("check", response);
        if (response) {
            res.send(username);
            res.end();
        } else {
            res.send(false);
            res.end();
        }
    })
        .catch(err => {
            throw err;
        })
})

router.get('/getproperties', (req, res) => {
    properties.getAllProperties().then(response => {
        res.send({ "res": true, "properties": response });
        res.end();
    })
        .catch(err => {
            res.send({ "res": false, "message": err.message });
            res.end();
        })
})

router.post('/add-property/:userID', (req, res) => {
    console.log("form-data");
    let userID = req.params.userID;
    let obj = req.body;
    let property = {
        propertyName: obj.name,
        propertyRating: obj.rating,
        propertyAmenities: obj.amenities,
        propertyPrice: obj.price,
        userID: userID,
    }
    properties.addProperty(property).then(data => {
        let message = `${data} added successfully for userID: ${userID}`;
        res.send({ "res": true, "message": message });
    }).catch(err => {
        res.send({ "res": false, "message": err.message });
        res.end();
    })
})

router.put('/updateProperty/:userID', (req, res) => {
    let userID = req.params.userID;
    let obj = req.body;
    let property = {
        propertyName: obj.name,
        propertyRating: obj.rating,
        propertyAmenities: obj.amenities,
        propertyPrice: obj.price,
        userID: userID,
    }
    properties.updateProperty(userID,property).then(data => {
        let message = `${data} added successfully for userID: ${userID}`;
        res.send({ "res": true, "message": message });
    }).catch(err => {
        res.send({ "res": false, "message": err.message });
        res.end();
    })
})

router.get('/get-properties/:userID', (req, res) => {
    let user = req.params.userID;
    properties.getPropertiesByUser(user).then(data => {
        res.send(data);
        res.end();
    }).catch(err => {
        res.send(false);
        res.end();
    })
})

module.exports = router;
