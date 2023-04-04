import {Express, Request, Response} from "express"
import validateResource from "./middlewares/validateResource.middleware"
import {createUserSchema} from "./schemas/user.schema"
import UserController from "./controllers/user.controller"
import {HttpStatusCode} from "./enums/httpStatusCode.enum"
import {createSessionSchema} from "./schemas/session.schema"
import UserSessionController from "./controllers/session.controller"
import requireUser from "./middlewares/requireUser.middleware"
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema
} from "./schemas/product.schema"
import ProductController from "./controllers/product.controller"

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
    app.get("/api/sessions", requireUser, UserSessionController.get)
    //--delete session
    app.delete("/api/sessions", requireUser, UserSessionController.delete)

    //products
    //--create product
    app.post("/api/products", [requireUser, validateResource(createProductSchema)], ProductController.create)
    //--update product
    app.put("/api/products/:productId", [requireUser, validateResource(updateProductSchema)], ProductController.update)
    //--get product
    app.get("/api/products/:productId", validateResource(getProductSchema), ProductController.get)
    //--index products
    app.get("/api/products", ProductController.index)
    //--delete product
    app.delete("/api/products/:productId", [requireUser, validateResource(deleteProductSchema)], ProductController.delete)
}

export default routes