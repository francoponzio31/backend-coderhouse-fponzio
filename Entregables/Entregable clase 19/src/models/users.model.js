import {Schema, model} from "mongoose"


const usersSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref:"carts",
        required: true
    },
    role:{
        type: String,
        default:"user"
    },
    from_github:{
        type: Boolean,
        default: false
    }
})

export const usersModel = model("users", usersSchema)