const express = require("express");
const router = express.Router();

const {localFileUpload,imageUpload,videoUpload,imageSizeReducer} = require("../controllers/fileUpload");

//api route 
router.post("/localfileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageSizeReducer",imageSizeReducer);
module.exports = router;
