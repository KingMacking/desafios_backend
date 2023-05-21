import swaggerJSDoc from 'swagger-jsdoc'

console.log('../docs/**/*.yaml');
const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Documentacion API eCommerce',
            version: '1.0.0',
        },
    },
    apis: ['./src/docs/**/*.yaml']
}

const swaggerSetup = swaggerJSDoc(swaggerOptions)

export default swaggerSetup