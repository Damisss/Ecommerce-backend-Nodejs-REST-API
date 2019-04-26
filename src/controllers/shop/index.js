const Product = require('../../models/admin')
const ShoppingCard = require('../../models/shop/shoppingCard')
const httpStatus = require('http-status')
//Get all products
exports.getAllProducts = async (req, res, next)=>{
      try {
          const {category} = req.query
        const products = await Product.find({category: category})
        return res.status(httpStatus.OK).json(products)
      } catch (error) {
          return res.status(httpStatus.BAD_REQUEST)
      }
}

//Get single product in order to display in product details
exports.getProduct = async (req, res, next)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        return res.status(httpStatus.OK).json(product)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}
//post shoppingCard or add product to card

exports.postShoppingCard = async (req, res, next)=>{
    try {
        const {productId} = req.params
        const product = await Product.findOne({_id: productId})
             req.user.addToShoppingCart(product)
        return res.status(httpStatus.OK).json('OK')
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}
exports.getShoppingCard = async(req, res, next)=>{
    try {
       const user = await req.user.populate("shoppingCart.items.products").execPopulate()
      const cart = user.shoppingCart.items.map(p=>{
           return {product: p.products.mark, quantity: p.quantity, price: p.totalPrice }
       })
      return res.status(httpStatus.FOUND).json(cart)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)   
    }
}

exports.deleteProductFromCard = async (req, res, next)=>{
    try {
        const {productId} = req.params
        const product = await Product.findOne({_id: productId})
         req.user.deleteFromCart(product)
        return res.status(httpStatus.OK).json('OK')
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST) 
    }
}

exports.wishList = async (req, res, next)=>{
    try {
        const {productId} = req.params
        const product = await Product.findOne({_id: productId})
         if(product){
            req.user._wishList(productId)
            return res.status(httpStatus.OK).json('OK')
         }
         return null
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}
exports.getWshList = async (req, res, next)=>{
    try {
        const user = await req.user.populate('wishList.products').execPopulate()
        res.status(httpStatus.OK).json(user.wishList.products)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}