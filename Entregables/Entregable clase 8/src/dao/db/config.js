import mongoose from "mongoose";

const URI = "mongodb+srv://francoponzio31:QRgVbUXGnFPOZTrx@cluster0.gn9lzii.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose
    .connect(URI)
    .then(() => console.log("connected to db"))
    .catch((error) => console.log(error))