export function showGenres(genres: string[]) {
    if (genres.length > 3) {
        return genres.slice(0, 3).join(', ') + '...';
    } else {
        return genres.join(', ') || 'unknown';
    }
}