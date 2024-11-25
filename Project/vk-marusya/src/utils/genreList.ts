export function getGenresList(genres: string[]) {
    return genres.join(', ') ? genres.join(', ') : 'unknown';
}