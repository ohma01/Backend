import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// configuring cors 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// configuration for receiving the json data and setting limit on it
app.use(express.json({
    limit:"20kb"
}))

// configuration for receiving the data from the url and for receivinng 
// the nested Object we keep extended equals to true
app.use(urlencoded({
    extended : true,
    limit : "20kb"
}))

// configuration for storing files, img,  favicon, etc on the server in public folder
app.use(express.static("public"))

// configuration for performing crud operation on the cookie stored on client side
app.use(cookieParser());

export default app;