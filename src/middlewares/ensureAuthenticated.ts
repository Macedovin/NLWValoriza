import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  // Receive token
  const authToken = request.headers.authorization;

  // Validate if the token is filled
  if (!authToken) {
    return response.status(401).end();
  }

  // Validate if the token is valid
  const [,token] = authToken.split(" ");
  
  try{

    const { sub } = verify(token ,"11cea127415bdc607a23039bf78455f0") as IPayload; 

    // Retrieve user information
    request.user_id = sub;

    return next();
  
  } catch(err){

    return response.status(401).end();
  } 

}