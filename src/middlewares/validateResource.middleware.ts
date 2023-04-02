import {NextFunction, Request, Response} from "express"
import {AnyZodObject} from "zod"

const validate = (schema: AnyZodObject) => (request: Request, response: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: request.body,
            query: request.query,
            params: request.params
        })
        next()
    } catch (error: any) {
        response.sendStatus(400).send(error.errors)
    }
}

export default validate