import mongoose from "mongoose";

export const URI = "mongodb+srv://francoponzio31:QRgVbUXGnFPOZTrx@cluster0.gn9lzii.mongodb.net/ecommerce?retryWrites=true&w=majority"

export function connectToDb(){
    mongoose
        .connect(URI)
        .then(() => console.log("connected to db"))
        .catch((error) => console.log(error))
}