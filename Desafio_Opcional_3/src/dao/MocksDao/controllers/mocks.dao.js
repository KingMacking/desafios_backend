import { generateProducts } from "../../../utils/generateFakeProducts.js"

class MocksDao {
    getAll = (quantity) => {
        try {
            const products = generateProducts(quantity)
            console.log(quantity);
            console.log(products);
            return products
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }
}

export default new MocksDao()