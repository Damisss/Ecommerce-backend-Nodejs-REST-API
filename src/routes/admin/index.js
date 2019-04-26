const {Router} = require('express')
const productController = require('../../controllers/admin')
const {jwtAuth} = require('../../service/authentication')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null, './uploads/')
    },
    filename: function(req, file, cb){
         cb(null, new Date().toISOString() + file.originalname)
    }
})
const imageFilter = function (req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true)
       }else{
      cb(null, false)
       }
}
const uploads = multer({storage: storage,
    limits:{
   fieldSize: 1024 * 1024 * 5
},   
    fileFilter: imageFilter
})


const route = new Router()
//Post product
route.post('/add-product', jwtAuth, uploads.single('image'), productController.postAddProduct)
route.patch('/edit-product/:id', jwtAuth,productController.patchProduct)
route.delete('/delete-product/:id', jwtAuth,productController.deleteProduct)

module.exports = route