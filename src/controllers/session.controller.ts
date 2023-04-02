import {Request, Response} from "express";
import UserService from "../services/user.service"

class SessionController {
    static async create(request:Request,response:Response) {
        //Validate the user's password
        const user = UserService.validatePassword(request.body)
        if(!user)
            return response.status(401).send("Invalid email or password")

        //Create a session

        //Create an access token

        //Create a refresh token

        //Access to access and refresh token
    }
}