const {Router} = require('express')
const {jwtAuth} = require('../../service/authentication')
const route = new Router()

const shopController = require('../../controllers/shop/index')
route.get('/get-products', shopController.getAllProducts)
route.get('/get-product/:id', shopController.getProduct)
route.post('/post-cart/:productId',jwtAuth, shopController.postShoppingCard)
route.get('/get-cart',jwtAuth, shopController.getShoppingCard )
route.delete('/delete-product/:productId', jwtAuth, shopController.deleteProductFromCard)
route.post('/post-wishlist/:productId', jwtAuth, shopController.wishList)
route.get('/get-wishlist', jwtAuth,shopController.getWshList)
module.exports = route 