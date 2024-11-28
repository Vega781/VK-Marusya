export const ProfileSchema = z.object({
    /**
     * Идентификатор профиля
     */
    email: z.string(),
    favorites: z.array(z.string()),
    name: z.string(),
    surname: z.string(),
})

export type Profile = z.infer<typeof ProfileSchema>