import { getCustomRepository } from "typeorm"

import { UsersRepositories } from "../repositories/UsersRepositories";

import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string,
  password: string,
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {  
    const userRepository = getCustomRepository(UsersRepositories)

    // Verify if email exists
    const existingUser = await userRepository.findOne({
      email
    });

    if(!existingUser) {
      throw new Error("Email/ Password incorrect!")
    }
    
    // Verify if password match
    const passwordMatch = await compare(password, existingUser.password)

    if(!passwordMatch) {
      throw new Error("Email/ Password incorrect!")
    }

    // Generate Token
    const token = sign(
      {
        email: existingUser.email,
      },
      "11cea127415bdc607a23039bf78455f0",
      {
        subject: existingUser.id,
        expiresIn: "1d",
      }
    );

    return token;

  }
}

export { AuthenticateUserService };