import {Request, Response} from "express"
import UserService from "../services/user.service";
import logger from "../utills/logger.utill";
import {CreateUserInput} from "../schemas/user.schema";
import {HttpStatusCode} from "../enums/httpStatusCode.enum";

class UserController {
    static async create(request: Request<{}, {}, CreateUserInput["body"]>, response: Response) {
        try {
            const user = await UserService.create(request.body)
            return response.send(user)
        } catch (error: any) {
            logger.error(error)
            return response.status(HttpStatusCode.Conflict).send(error.message)
        }
    }
}

export default UserController