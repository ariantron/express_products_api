import express from "express"
import config from "config"
import connect from "./utills/db"
import logger from "./utills/logger"

const app = express()

const port = config.get<number>("port")

app.listen(port, async () => {
    logger.info(`App is running at https://localhost:${port}`)
    await connect()
})