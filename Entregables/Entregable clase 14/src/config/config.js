import dotenv from "dotenv"

dotenv.config()

export default {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    appSecretKey: process.env.SECRET_KEY,
}