import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from "../repositories/UsersRepositories"

import { instanceToPlain } from "class-transformer";

class ListAdminUsersService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const users = await usersRepositories.find({
      where: {
        admin: true,
      }
    });

    return instanceToPlain(users); 
  }
}

export { ListAdminUsersService } 