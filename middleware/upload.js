const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const url = "mongodb+srv://sean:admin@black-dymond-enterprise.bxkyr.mongodb.net/black-dymond-enterprises?retryWrites=true&w=majority"

const storage = new GridFsStorage({
    url: url,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "application/pdf"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });