import {Express, Request, Response} from "express"
import validateResource from "./middlewares/validateResource";
import {createUserSchema} from "./schemas/user.schema";
import UserController from "./controllers/user.controller";

function routes(app: Express) {

    //test
    app.get('/test', (request: Request, response: Response) => {
        response.sendStatus(200)
    })

    //users
    //--create user
    app.post('/users',validateResource(createUserSchema),UserController.create)

}

export default routes