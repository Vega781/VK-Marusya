import { z } from "zod"
import { validateResponse } from "../utils/validateResponse"
import { api_url } from "./url"

export const ProfileSchema = z.object({
    /**
     * Идентификатор пользователя
     */
    email: z.string(),
    favorites: z.array(z.string()),
    name: z.string(),
    surname: z.string(),
})

export type Profile = z.infer<typeof ProfileSchema>

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

export function fetchMe(): Promise<Profile> {
    return fetch(`/profile`)
        .then(validateResponse)
        .then((response) => response.json())
        .then((data) => ProfileSchema.parse(data))
}