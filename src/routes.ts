import {Express, Request, Response} from "express"
import validateResource from "./middlewares/validateResource.middleware"
import {createUserSchema} from "./schemas/user.schema"
import UserController from "./controllers/user.controller"
import {HttpStatusCode} from "./enums/httpStatusCode.enum"
import {createSessionSchema} from "./schemas/session.schema"
import UserSessionController from "./controllers/session.controller"
import SessionController from "./controllers/session.controller"
import requireUser from "./middlewares/requireUser.middleware"

function routes(app: Express) {
    //test
    app.get('/api/test', (request: Request, response: Response) => {
        response.sendStatus(HttpStatusCode.Ok)
    })

    //users
    //--create user
    app.post('/api/users', validateResource(createUserSchema), UserController.create)

    //sessions
    //--create session
    app.post('/api/sessions', validateResource(createSessionSchema), UserSessionController.create)
    //--get sessions
    app.get("/api/sessions", requireUser, SessionController.get)
}

export default routes