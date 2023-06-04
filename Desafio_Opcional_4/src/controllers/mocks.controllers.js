import services from '../services/index.js'

const { mocksService } = services

class MockController {
    getFakeProducts = (req,res) => {
        const {quantity=100} = req.query
        try {
            const products = mocksService.getAllProducts(quantity)
            res.send(products)
        } catch (error) {
            next(error)
        }
    }
}

export default new MockController()