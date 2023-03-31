import mongoose from "mongoose"
import config from "config"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
}, {
    timestamps: true
})

export interface userDocument extends mongoose.Document {
    email: string
    name: string
    password: string
    createdAt: Date
    updatedAt: Date

    comparePasswords(candidatePassword: string): Promise<boolean>
}

userSchema.pre("save", async function (next) {
    const user = this as userDocument
    if (!user.isModified("password"))
        return next()
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
    user.password = bcrypt.hashSync(user.password, salt)
    return next()
})

userSchema.methods.comparePasswords = async function (candidatePassword: string): Promise<boolean> {
    const user = this as userDocument
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const userModel = mongoose.model('User', userSchema)

export default userModel