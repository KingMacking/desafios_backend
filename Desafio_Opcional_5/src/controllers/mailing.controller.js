import { transporter } from "../config/nodemailerConfig.js";
import SessionDTO from "../dto/UsersDTO/session.dto.js";
import services from '../services/index.js';

const {ticketsService} = services

class MailingController{

    sendTicketOrder = async (req,res) => {
        const session = new SessionDTO(req.session)
        const {email} = session
        const {ticketId} = req.params
        try {
            const ticket = await ticketsService.getTicketById(ticketId)
            transporter.sendMail({
                from: 'eCommerce',
                to: email,
                subject: 'Tu compra',
                template: 'emailTicket',
                context: {
                    ticket: ticket
                }
            })
            res.json('Email enviado')
        } catch (error) {
            next(error)
        }
    }
}

export default new MailingController

