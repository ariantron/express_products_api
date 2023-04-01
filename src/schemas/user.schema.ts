import {object, string, TypeOf} from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Email is not valid"),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is too short, should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "Password Confirmation is required"
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"]
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">