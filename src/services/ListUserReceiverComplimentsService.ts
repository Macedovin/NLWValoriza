import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

import { instanceToPlain } from "class-transformer";

class ListUserReceiverComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
  
    const compliments = await complimentsRepositories.find({
      
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]

    });

    return instanceToPlain(compliments);
  } 
}

export { ListUserReceiverComplimentsService }; 