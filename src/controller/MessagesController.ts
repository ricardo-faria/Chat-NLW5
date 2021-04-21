import { Request, Response } from "express";
import { MessageService } from "../services/MessagesService";

class MessagesController{
    async create(request: Request,  response: Response){
        const { user_id, admin_id, text } = request.body;

        const messagesService = new MessageService();

        try{
            const message = await messagesService.create({user_id, admin_id, text})
            return response.json(message);
        } catch(err){
            return response.status(400).json({"message": err.message})
        }

    }


    async showByUser(request: Request, response: Response){
        const { id } = request.params;

        const messagesService = new MessageService();

        const list = await messagesService.listByUser(id);

        return response.json(list);
    }
}

export { MessagesController };