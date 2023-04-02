import dayjs from "dayjs"

const pino = require('pino')
const pretty = require('pino-pretty')
let options = {
    colorize: true,
    customPrettifiers: {
        time: () => dayjs().format()
    }
}
const stream = pretty(options)
const logger = pino(stream)

export default logger