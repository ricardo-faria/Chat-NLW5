import { getCustomRepository, Repository } from "typeorm";
import { Messages } from "../entities/Messages";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
    user_id: string,
    admin_id?: string,
    text: string
}

class MessageService{
    private messagesRepository : Repository<Messages>;

    constructor(){
        this.messagesRepository = getCustomRepository(MessagesRepository)
    }


    async create({user_id, admin_id, text} : IMessageCreate){

        const newMessage = this.messagesRepository.create({
            user_id,
            admin_id,
            text
        });

        await this.messagesRepository.save(newMessage);

        return newMessage;
    }


    async listByUser(user_id: string){

        const listMessages = this.messagesRepository.find({
            where: { user_id },
            relations : ["user"]
        });

        return listMessages;
    }
}

export { MessageService };