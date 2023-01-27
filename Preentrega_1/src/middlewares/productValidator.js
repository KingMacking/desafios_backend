export const productValidator = (req,res,next) => {
    const product = req.body
    const isBoolean = val => 'boolean' === typeof val
    if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category || !isBoolean(product.status)){
        res.send('Debes ingresar todos los campos correctamente')
    } else {
        next()
    }
}