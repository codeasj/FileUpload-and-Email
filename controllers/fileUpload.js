const File = require("../models/File");
const cloudinary = require("cloudinary").v2; 

//Local file upload -> handler function
exports.localFileUpload = async(req,res) => {
    try{
        //fetch file from request
        const file = req.files.file;
        console.log("Files-> ",file);

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create successfull response
        res.json({
            success : true,
            message: 'Local File Uploaded Successfully'
        });

    } catch(error) {
        console.log("Not able to upload");
        console.log(error);
    }
}

// image upload -> handler function

function isFileTypeSupported(type,supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality) {
    const options = {folder};
    if(quality) {    //for image compression
        options.quality = quality;
    }
    options.resource_type = "auto";  //for video ,detect file type automatically
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async(req,res) => {
    try{
        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //file type supported or not
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //file format supported
        console.log("uploading to myFolder");
        const response = await uploadFileToCloudinary(file,"myFolder");
        console.log(response);

        //save in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            message:'Image Succesfully Uploaded'
        })
    } catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        });
    }
}  //end of image upload function

//video upload -> handler function
exports.videoUpload = async(req,res) => {
    try{
        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //file type supported or not
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //file format supported
        console.log("uploading to myFolder");
        const response = await uploadFileToCloudinary(file,"myFolder");
        console.log(response);

        //save in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            message:'video Succesfully Uploaded'
        })
    } catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        });
    }
}  //end of video upload function

//image size reducer => handler function
exports.imageSizeReducer = async(req,res) => {
    try{
        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //file type supported or not
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //file format supported
        console.log("uploading to myFolder");
        const response = await uploadFileToCloudinary(file,"myFolder",90);
        console.log(response);

        //save in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            message:'compressed image Succesfully Uploaded'
        })
    } catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        });
    }
}  //end of image reducer function