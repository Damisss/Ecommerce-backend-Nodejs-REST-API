const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchema = new Schema({
    mark:{
        type: String,
        required: [true, "Mark is required"],
       // message: `{VALUE} is required`
    },
    name:{
        type: String,
        required: [true, "Mark is required"],
      //  message: `{VALUE} is required`
    },
    price:{
        type: Number,
        required: [true, "Mark is required"],
       // message: `{VALUE} is required`
    },
    description:{
        type: String,
        required: [true, "Mark is required"],
       // message: `{VALUE} is required`
    },
    category:{
        type: String,
        required: [true, "Mark is required"],
        //message: `{VALUE} is required`
    },
    productImage:{
        type: String,
        //required: [true, "image is required"],
       // message: `{VALUE} is required`
    },
})

productSchema.methods ={
    toJSON(){
        return{
            _id: this._id,
            productImage: this.productImage,
            mark: this.mark,
            name: this.name,
            price: `$ ${this.price}`,
            description: this.description,
            category: this.category
        }
    }
}
const Product = mongoose.model('Product', productSchema)

module.exports = Product