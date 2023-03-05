import mongoose from 'mongoose'

const URI = "mongodb+srv://matiasatzori:Mack27659870@cluster0.gq5ntlp.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.connect(URI)
.then(() => {
    console.log("Conctado con exito a la base de datos");
})
.catch((error) => {
    console.log(error)
})