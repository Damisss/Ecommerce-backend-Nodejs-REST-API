const mongoose = require('mongoose')
const {hashSync, compareSync} = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const Product = require('../admin')

const Schema = mongoose.Schema
const userSchema = new Schema({
    firstName:{
        type: String, 
       // required: true,
        trim: true, 
    },
    lastName:{
        type: String, 
        //required: true,
        trim: true,
    },
    email:{
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String, 
        required: true,
        trim: true,
        minlength: [6, 'password must be longer']
    },
    shoppingCart:{
        items: [{
            products:{
                type: Schema.Types.ObjectId, 
                ref: 'Product', 
               //required: true
            },
            quantity: {
                type: Number,
                //required: true
                },
                totalPrice:{
                 type: Number,
                 //required: true
                }
        }],
        sum:[{
            type: Number
        }],
    },
    wishList:{
        products:[{
            type: Schema.Types.ObjectId, 
            ref: 'Product',
        }]
    }
})

userSchema.pre('save', function(next){
    this.password = this.hashPassword(this.password)
    next()
})
userSchema.methods= {
    hashPassword(password){
      return hashSync(password)
    },
    comparePassword(password){
      return compareSync(password, this.password)
    },
    generateToken(){
       return jwt.sign({
        _id: this._id
       }, 'secret')
    },
    toJSON(){
       return{
           _id: this._id,
           email: this.email,
           token: `JWT ${this.generateToken()}`
       }
    },
    addToShoppingCart(product){
      const productIndex = this.shoppingCart.items.findIndex(index=>{
              return index.products.toString() === product._id.toString()
      })
     
       let price = product.price
      let newQuantity = 1
      let updatedCart = [...this.shoppingCart.items]
      if(productIndex >= 0){
          newQuantity = this.shoppingCart.items[productIndex].quantity + 1
          updatedCart[productIndex].quantity = newQuantity
          updatedCart[productIndex].totalPrice = price*newQuantity
        }else {
          updatedCart.push({
              products: product._id, 
              quantity: newQuantity, 
              totalPrice: price})}
              let updatedSum = 0
              let sumArray = []
              const updated = {items: updatedCart}
            
      this.shoppingCart = updated
      this.shoppingCart.items.forEach(p=>{
          return updatedSum = updatedSum+ p.totalPrice
      })
      sumArray.push(updatedSum) 
      //console.log(this.shoppingCart.sum.push(totalSum) )
      this.shoppingCart.sum = sumArray
      return this.save()  
   },
   deleteFromCart(product){
    const productIndex = this.shoppingCart.items.findIndex(index=>{
       return index.products.toString() === product._id.toString()
    })
    let price = product.price
    let newQuantity
    let updatedCart = [...this.shoppingCart.items]
    let sum = [...this.shoppingCart.sum]
    if(productIndex >= 0){
        newQuantity = this.shoppingCart.items[productIndex].quantity - 1
       updatedCart[productIndex].quantity = newQuantity
       updatedCart[productIndex].totalPrice -= price  
    }  
        updatedCart = this.shoppingCart.items.filter(cart=>{
            return cart.quantity !== 0
        })
       let updatedSum = sum[0] - price
       //update the total price on user's shopping cart
       const newSumArray = [].concat(updatedSum)
      
    const updated = {items: updatedCart}
     this.shoppingCart = updated
     this.shoppingCart.sum = newSumArray
    return this.save()
   },
   _wishList(productId){
    if(this.wishList.products.indexOf(productId) >= 0){
        this.wishList.products.remove(productId)
    }else{
        this.wishList.products.push(productId)
    }
    return this.save()
   }
}
const User = mongoose.model('User', userSchema)

module.exports = User
