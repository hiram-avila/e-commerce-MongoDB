import { Schema } from "mongoose";


const productSchema = Schema({

    title:{
        type:String,
        required:true,
        trim: true
    },

    id:{
        type: String,
        required: true,
        trim: true
    },

    price:{
        type: String,
        required: true,
        trim: true,
    },

    category:{
        type: String,
        required: true,
        trim: true,
    },

    image:{
        type:String,
        required: true
    }

})

const Product = mongoose.model('Product', productSchema);

export default Product;