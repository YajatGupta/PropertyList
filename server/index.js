const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routing');
const multer = require('multer');
const path = require('path');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname , '../public'));
    },
    filename: (req, file, cb) => {
        cb(null,  'Image-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(cors());
app.use(
    multer({storage:fileStorage,fileFilter:fileFilter}).single('propimage')
);
app.use(bodyParser.json());

//app.use('/images', express.static(path.join(__dirname,'../../public','images')));
app.use('/', router);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../",'build')));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../",'build','index.html'));
    })
}

app.listen(1050);
console.log("server has started");

module.exports = app;