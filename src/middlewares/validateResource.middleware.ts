import {NextFunction, Request, Response} from "express"
import {AnyZodObject} from "zod"
import {HttpStatusCode} from "../enums/httpStatusCode.enum";

const validate = (schema: AnyZodObject) => (request: Request, response: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: request.body,
            query: request.query,
            params: request.params
        })
        next()
    } catch (error: any) {
        response.sendStatus(HttpStatusCode.BadRequest).send(error.errors)
    }
}

export default validate