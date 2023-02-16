import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

import { instanceToPlain } from "class-transformer";

class ListUserSenderComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
  
    const compliments = await complimentsRepositories.find({
      
      where: {
        user_sender: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]

    });

    return instanceToPlain(compliments);
  } 
}

export { ListUserSenderComplimentsService }; 