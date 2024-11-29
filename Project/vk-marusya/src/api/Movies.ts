import { GenreType } from "../types/GenreType";
import { MovieType } from "../types/MovieType";
import { validateResponse } from "../utils/validateResponse";
import { api_url } from "./url";

export function getMovies(): Promise<MovieType> {
    return fetch(`${api_url}/movie/top10`).then(res => validateResponse(res)).then(res => res.json())
}

export function getRandomMovie(): Promise<MovieType> {
    return fetch(`${api_url}/movie/random`).then(res => validateResponse(res)).then(res => res.json())
}

export function getGenresList(): Promise<GenreType> {
    return fetch(`${api_url}/movie/genres`).then(res => validateResponse(res)).then(res => res.json())
}

export function getMoviesByGenre(genreId: string): Promise<MovieType> {
    return fetch(`${api_url}/movie?genre=${genreId}`).then(res => validateResponse(res)).then(res => res.json())
}

export function getCurrentMovie(movieId: string): Promise<MovieType> {
    return fetch(`${api_url}/movie/${movieId}`).then(res => validateResponse(res)).then(res => res.json())
}

export function getMoviesByTitle(title: string): Promise<MovieType> {
    return fetch(`${api_url}/movie?title=${title}`).then(res => validateResponse(res)).then(res => res.json())
}

export function getFavoriteMovies(): Promise<string[]> {
    return fetch(`${api_url}/favorites`, {credentials: 'include'}).then(res => validateResponse(res)).then(res => res.json())
}

export function addFavoriteMovie(movieId: string): Promise<MovieType> {
    return fetch(`${api_url}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ id: movieId })
    }).then(validateResponse).then(() => undefined)
}

export function removeFavoriteMovie(movieId: string): Promise<MovieType> {
    return fetch(`${api_url}/favorites/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(validateResponse).then(() => undefined)
}
