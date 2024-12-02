export const MoviesSchema = z.object({
    /**
     * Идентификатор фильма
     */
    id: z.number(),
    title: z.string(),
    originalTitle: z.string(),
    language: z.string(),
    relaseYear: z.number(),
    releaseDate: z.string(),
    genres: z.array(z.string()),
    plot: z.string(),
    runtime: z.number(),
    budget: z.string(),
    revenue: z.string(),
    homepage: z.string(),
    status: z.string(),
    posterUrl: z.string(),
    backdropUrl: z.string(),
    trailerUrl: z.string(),
    trailerYoutubeId: z.string(),
    tmdbRating: z.number(),
    searchL: z.string(),
    keywords: z.array(z.string()),
    countriesOfOrigin: z.array(z.string()),
    languages: z.array(z.string()),
    cast: z.array(z.string()),
    director: z.string(),
    production: z.string(),
    awardsSummary: z.string(),
})

export type Movie = z.infer<typeof MoviesSchema>;
export const MovieList = z.array(MoviesSchema);
export type MovieType = z.infer<typeof MovieList>;