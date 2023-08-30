// 

const multer = require('multer')

console.log("multer ")

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images');
        },
        filename: function (req, file, cb) {
            const fileType = file.mimetype.split('/')[1]
            cb(null, file.fieldname + '-' + Date.now() + "." + fileType);
        } 
    }),
});

module.exports = upload; 