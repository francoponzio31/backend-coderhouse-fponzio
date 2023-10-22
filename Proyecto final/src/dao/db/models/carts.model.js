import {Schema, model} from "mongoose"


const cartsSchema = new Schema({
    products: {
        type: [
            {
                id: {
                    type: Schema.Types.ObjectId,
                    ref:"products",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
})

cartsSchema.pre("find", ()=>{
    // Middleware que se ejecutara antes de cada operacion de "find" sobre el sechema
    this.populate("products.id")
})

export const cartsModel = model("carts", cartsSchema)