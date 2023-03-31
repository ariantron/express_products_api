import {Express, Request, Response} from "express"

function routes(app: Express) {
    app.get('/test', (request: Request, response: Response) => {
        response.sendStatus(200)
    })
}

export default routes