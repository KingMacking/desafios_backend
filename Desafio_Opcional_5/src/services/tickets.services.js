export default class TicketsService {
    constructor(dao){
        this.dao = dao
    }

    getAllTickets(){
        return this.dao.getAll()
    }

    createPurchaseTicket(ticket){
        return this.dao.save(ticket)
    }

    getTicketById(id){
        return this.dao.getById(id)
    }
}