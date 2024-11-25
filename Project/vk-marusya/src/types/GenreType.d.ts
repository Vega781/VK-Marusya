export const GenreSchema = z.object({
    genre: z.array(z.number())
})

export type Genre = z.infer<typeof GenreSchema>;
export const GenresList = z.array(GenreSchema);
export type GenreType = z.infer<typeof GenresList>;