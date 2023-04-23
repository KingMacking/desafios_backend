import mongoose from 'mongoose'
import envConfig from './envConfig.js';

const URI = envConfig.mongoUri

mongoose.connect(URI)
.then(() => {
    console.log("Conctado con exito a la base de datos");
})
.catch((error) => {
    console.log(error)
})