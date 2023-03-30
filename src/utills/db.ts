import mongoose from "mongoose"
import config from "config"

async function connect() {
    const dbUri = config.get<string>('dbUri')
    try {
        await mongoose.connect(dbUri)
        console.log('Connected to DB')
    } catch (error) {
        console.error(`Could not connected to DB because:\nError: ${error}`)
        process.exit(1)
    }
}

export default connect