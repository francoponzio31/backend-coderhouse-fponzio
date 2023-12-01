import mongoose from "mongoose"
import config from "./config.js"


const URI = config.mongoURI

export function connectToDb(){
    mongoose
        .connect(URI)
        .then(() => console.log("connected to db"))
        .catch((error) => console.log(error))
}