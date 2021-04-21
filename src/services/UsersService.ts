import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
    async create(email: string){
        const usersRepository = getCustomRepository(UsersRepository);
        
        const userExists = await usersRepository.findOne({email})

        if (userExists){
            return userExists;
        }
        
        const newUser = usersRepository.create({
            email
        })

        await usersRepository.save(newUser);

        return newUser;
    }
}

export { UsersService };