import dotenv from "dotenv";
import dbConnect from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path:'./env'
})
const PORT = process.env.PORT || 4000;

dbConnect()
.then(()=>{
    app.on("error",(error)=>{
        console.log(`ERROR : ${error}`)
    })

    app.listen(PORT,()=>{
        console.log(`App is running successfully on Port No. ${PORT}`)
    })
})
.catch((error)=>{
console.log(`Mongodb connection failed !. ${error}`)
});










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