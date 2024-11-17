export function getMovies(url: string) {
    return fetch(url).then(res => res.json())
}