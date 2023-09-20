const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT||3000;
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'tmp/'
}));

//cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
//database connection
require("./config/database").connect();
//api mount
const upload = require("./routes/FileUpload");
app.use('/api/v1/upload',upload);
//server actiavation
app.listen(PORT, ()=> {
    console.log(`Server started succesfully at ${PORT}`);
})

