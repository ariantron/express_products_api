import {Request, Response} from "express";
import UserService from "../services/user.service"
import {HttpStatusCode} from "../enums/httpStatusCode.enum";

class SessionController {
    static async create(request:Request,response:Response) {
        //Validate the user's password
        const user = UserService.validatePassword(request.body)
        if(!user)
            return response.status(HttpStatusCode.Unauthorized).send("Invalid email or password")

        //Create a session

        //Create an access token

        //Create a refresh token

        //Access to access and refresh token
    }
}