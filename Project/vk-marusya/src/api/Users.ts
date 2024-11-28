import { z } from "zod"
import { validateResponse } from "../utils/validateResponse"
import { api_url } from "./url"

export const UserSchema = z.object({
    /**
     * Идентификатор пользователя
     */
    email: z.string(),
    password: z.string(),
    name: z.string(),
    surname: z.string(),
})

export type User = z.infer<typeof UserSchema>

export function registerUser(
    email: string, 
    password: string,
    name: string,
    surname: string,
): Promise<void> {
    return fetch(`${api_url}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, surname }),
    }).then(() => undefined)
}

export function loginUser(
    email: string, 
    password: string
): Promise<void> {
    return fetch(`${api_url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(validateResponse).then(() => undefined)
}

export function fetchMe(): Promise<User> {
    return fetch(`${api_url}/profile`)
        .then(validateResponse)
        .then((response) => response.json())
        .then((data) => UserSchema.parse(data))
}