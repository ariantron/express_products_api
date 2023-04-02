import { Request, Response, NextFunction } from "express"
import {HttpStatusCode} from "../enums/httpStatusCode.enum"

const requireUser = (request: Request, response: Response, next: NextFunction) => {
  const user = response.locals.user
  if (!user) return response.sendStatus(HttpStatusCode.Forbidden)
  return next()
}

export default requireUser