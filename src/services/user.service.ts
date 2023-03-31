import UserModel, {UserInput} from "../models/user.model"
import {omit} from "lodash"

export async function create(input: UserInput) {
    try {
        const user = await UserModel.create(input)
        return omit(user.toJSON, "password")
    } catch (error) {
        throw new Error(error)
    }
}