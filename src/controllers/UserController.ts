import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../models/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User already exist"
            })
        }
        
        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);

        return response.status(201).send(user);
    }
}

export { UserController };