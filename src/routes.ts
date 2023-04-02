import {Express, Request, Response} from "express"
import validateResource from "./middlewares/validateResource.middleware";
import {createUserSchema} from "./schemas/user.schema";
import UserController from "./controllers/user.controller";
import {HttpStatusCode} from "./enums/httpStatusCode.enum";

function routes(app: Express) {

    //test
    app.get('/test', (request: Request, response: Response) => {
        response.sendStatus(HttpStatusCode.Ok)
    })

    //users
    //--create user
    app.post('/users',validateResource(createUserSchema),UserController.create)

}

export default routes