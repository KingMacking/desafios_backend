export const productValidator = (req,res,next) => {
    const product = req.body
    if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category){
        res.send('Debes ingresar todos los campos correctamente')
    } else {
        next()
    }
}