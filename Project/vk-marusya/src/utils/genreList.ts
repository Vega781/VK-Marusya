export function getGenresList(genres: string[]) {
    return genres.map((genre: string) => `${genre} `);
}