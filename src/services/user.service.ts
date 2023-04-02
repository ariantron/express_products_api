import {omit} from "lodash"
import UserModel, {UserDocument, UserInput} from "../models/user.model"
import {FilterQuery} from "mongoose";

class UserService {
    static async create(input: UserInput) {
        try {
            const user = await UserModel.create(input)
            return omit(user.toJSON(), "password")
        } catch (error: any) {
            throw new Error(error)
        }
    }

    static async validatePassword({email, password}: { email: string, password: string }) {
        const user = await UserModel.findOne({ email })
        if (!user) return false
        const isValid = await user.comparePassword(password)
        if (!isValid) return false
        return omit(user.toJSON(), "password")
    }

    static async find(query: FilterQuery<UserDocument>) {
        return UserModel.findOne(query).lean()
    }
}

export default UserService