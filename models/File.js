const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    imageUrl: {
        type:String,
    },
    tags: {
        type: String,
    },
    email: {
        type:String,
    }
});

// Post middleware

fileSchema.post("save", async function(doc) {
    try {
        console.log("Doc",doc);
        //tranporter
        //const {transport} = require("../config/nodemailer");
        let transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        }); 
        
        //Send mail
        let info = await transport.sendMail({
            from: 'Mail By Anuj',
            to:doc.email,
            subject: "New File Uploaded to cloudinary",
            html: `<h2> Hello jee</h2>
             <p>File uploaded view here: <a href="${doc.imageUrl}"> ${doc.imageUrl} </a> </p>`
        })

        console.log("INFO",info);
    } catch(error) {
        console.error(error)
    }
})


const File = mongoose.model("File",fileSchema);
module.exports = File;