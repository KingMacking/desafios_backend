export default class MocksService {
    constructor(dao){
        this.dao = dao
    }

    getAllProducts = (quantity) => {
        return this.dao.getAll(quantity)
    }
}