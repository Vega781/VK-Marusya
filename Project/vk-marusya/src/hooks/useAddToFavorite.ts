import { useQueryClient } from "@tanstack/react-query"
import { addFavoriteMovie, removeFavoriteMovie } from "../api/Movies"

interface UseAddToFavoriteProps {
    isAdded: boolean
}

export const useAddToFavorite = ({ isAdded }: UseAddToFavoriteProps) => {
    const queryClient = useQueryClient()

    return ({
        mutationFn: (movieId: string | number) => {
            const id = String(movieId);
            return isAdded
                ? removeFavoriteMovie(id)
                : addFavoriteMovie(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        }
    })
}