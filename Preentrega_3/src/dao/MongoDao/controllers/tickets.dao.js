import { ticketModel } from '../models/ticket.model.js'
import BasicDao from './basic.dao.js'

class TicketDao extends BasicDao{
    constructor(model){
        super(model)
    }

    async getAll(){
        try {
            const response = ticketModel.find()
            return response
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }
}

export default new TicketDao(ticketModel)