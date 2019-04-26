const Product = require('../../models/admin')
const httpStatus = require('http-status')

// Post product to database by admin
exports.postAddProduct = async (req, res, next)=>{
   try {  
       console.log({...req.body, productImage: req.file.path})
 //const { mark, name, price, description, category} = req.body
    const product =  new Product({...req.body, productImage: req.file.path})
               await product.save()
    return  res.status(httpStatus.CREATED).json(product)
   } catch (error) {
    return res.status(httpStatus.BAD_REQUEST)
   }
}
//Edit single product by admin
exports.patchProduct = async (req, res, next)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        Object.keys(req.body).forEach(prod=>{
            product[prod] = req.body[prod]
        })
        console.log(product)
           await product.save()

        return res.status(httpStatus.OK).json(product)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}

exports.deleteProduct = async (req, res, next)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            throw error
        }
           await product.remove()
        return res.status(httpStatus.OK).json(product)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}