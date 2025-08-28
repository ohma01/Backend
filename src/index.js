import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/index.js";
dotenv.config({
    path:'./env'
})

const app = express();

dbConnect();










/*
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on((error) => {
            console.log("ERROR :", error);
            throw error;

        })
        app.listen(process.env.PORT, () => {
            console.log("App is running on Port No. ", process.env.PORT);
        })
    } catch (error) {
        console.log(`Error: ${error}`)
        throw error;
    }

})()

*/