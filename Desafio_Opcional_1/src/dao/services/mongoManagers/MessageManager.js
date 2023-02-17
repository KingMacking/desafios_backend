import { messagesModel } from "../../models/messages.model.js";

export default class MessageManager {

    async getMessages() {
        try {
            const messages = await messagesModel.find()
            return messages
        } catch (error) {
            return error
        }
    }

    async sendMessage(sendedMessage){
        try {
            const message = {...sendedMessage}
            const newMessage = await messagesModel.create(message)
            return newMessage
        } catch (error) {
            return error
        }
    }
}