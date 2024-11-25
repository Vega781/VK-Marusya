import { GenreType } from "../types/GenreType";
import { MovieType } from "../types/MovieType";
import { api_url } from "./url";

export function getMovies(): Promise<MovieType> {
    return fetch(`${api_url}/movie/top10`).then(res => res.json())
}

export function getRandomMovie(): Promise<MovieType> {
    return fetch(`${api_url}/movie/random`).then(res => res.json())
}

export function getGenresList(): Promise<GenreType> {
    return fetch(`${api_url}/movie/genres`).then(res => res.json())
}

export function getMoviesByGenre(genreId: string): Promise<MovieType> {
    return fetch(`${api_url}/movie?genre=${genreId}`).then(res => res.json())
}

export function getCurrentMovie(movieId: string): Promise<MovieType> {
    return fetch(`${api_url}/movie/${movieId}`).then(res => res.json())
}