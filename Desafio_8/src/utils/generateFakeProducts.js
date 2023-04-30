import { faker } from '@faker-js/faker'

export const generateProducts = (quantity) =>{
    if(quantity === 1){
        return generateProduct(1)
    }
    const products = []
    for (let i=0; i<quantity; i++){
        const product = generateProduct(products.length + 1)
        products.push(product)
    }
    return products
}

const generateProduct = (code) => {
    const product ={
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        stock: parseInt(faker.random.numeric(2)),
        code: "00"+code,
        category: faker.commerce.department(),
        thumbnail: faker.image.image(),
        status: faker.datatype.boolean(),
        __v: 0,
    }
    return product
}