import { MovieType } from "../types/MovieType";
import { api_url } from "./url";

export function getMovies(): Promise<MovieType> {
    return fetch(`${api_url}/movie/top10`).then(res => res.json())
}

export function getRandomMovie(): Promise<MovieType> {
    return fetch(`${api_url}/movie/random`).then(res => res.json())
}