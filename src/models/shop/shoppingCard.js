const mongoose = require('mongoose')
const Product = require('../../models/admin')

const Schema = mongoose.Schema
const shoppingCardSchema = new Schema({
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        totalPrice:{
            type: Number,
            default: 0
        } 
       
})

shoppingCardSchema.statics ={
        async postCard(id, productPrice){
            const product = await Product.findById({_id: id})
               this.products.push(product._id)
            let updateProduct
            updateProduct = { id, qty: 1}
           
           return this.save()
         // this.card.products = [...this.card.products, updateProduct]
           
        //     let updateProduct
        //     const existingProduct = this.card.products[existingPrductIndex]
        //  if(existingProduct){
        //    updateProduct = {...existingProduct}
        //    updateProduct[qty] =  updateProduct[qty] + 1
        //    this.card.products = [...this.card.products]
        //    this.card.products[existingPrductIndex] = updateProduct
        //  }else{
        //     // this.products.push(id)
        //     //this.products.push(id)
        //      updateProduct = { id, qty: 1}
        //      this.card.products = [...this.card.products, updateProduct]
        //  }
        //   this.card.totalPrice = this.card.totalPrice + productPrice
        //   return  await this.save()
           
        }
}
const ShoppingCard = mongoose.model('ShoppingCard', shoppingCardSchema)
module.exports = ShoppingCard