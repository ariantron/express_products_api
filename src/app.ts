import express from "express"
import config from "config"
import connect from "./utills/db.utill"
import logger from "./utills/logger.utill"
import routes from "./routes"

const app = express()

app.use(express.json())

const port = config.get<number>("port")

app.listen(port, async () => {
    logger.info(`App is running at https://localhost:${port}`)
    await connect()
    routes(app)
})