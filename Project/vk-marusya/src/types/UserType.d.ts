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