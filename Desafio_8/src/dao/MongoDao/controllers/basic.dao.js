export default class BasicDao {
    constructor(model){
        this.model = model
    }

    async save(obj){
        try {
            const response = await this.model.create(obj)
            return response
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    async getById(id){
        try {
            const response = await this.model.findOne({_id: id}).lean()
            return response
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    async deleteById(id){
        try {
            const response = await this.model.deleteOne({_id: id})
            return response
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }
}