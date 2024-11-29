import { useEffect, useState } from "react"
import { Button } from "../../components/Button/Button"
import { ImageComponent } from "../../components/ImageComponent/ImageComponent"
import { Load } from "../../components/Loader/Loader"
import styles from '../../styles/mainPage.module.css'
import movieStyles from '../../styles/MoviePage.module.css'
import { MovieType } from "../../types/MovieType"
import { useParams } from "react-router-dom"
import { getCurrentMovie } from "../../api/Movies"
import { convertRunTime } from "../../utils/convertRunTime"
import { showGenres } from "../../utils/showGenres"
import { ratingColor } from "../../utils/ratingColor"
import { formatBudget } from "../../utils/formatBudget"
import { convertLanguage } from "../../utils/convertLanguages/convertLanguage"
import { TrailerModal } from "../../components/TrailerModal/TrailerModal"
import { useAddToFavorite } from "../../hooks/useAddToFavorite"
import { useAuth } from "../../hooks/useAuth"
import { AuthForm } from "../../components/AuthForm/AuthForm"
import { fetchMe } from "../../api/Users"

export const MoviePage = () => {
    const { id = '' } = useParams();
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState(false);

    const [isAdded, setIsAdded] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const { isAuthenticated } = useAuth()
    const { mutationFn: toggleFavorite } = useAddToFavorite({ isAdded });

    useEffect(() => {
        const getMovie = async () => {
            try {
                const movie = await getCurrentMovie(id);
                if (isAuthenticated) {
                    const profile = await fetchMe();
                    setIsAdded(profile.favorites.includes(String(movie.id)));
                }
                setMovie(movie);
            } catch (error) {
                console.error('Error fetching movie:', error);
            } finally {
                setLoading(false);
            }
        };
        getMovie();
    }, [id, isAuthenticated]);

    const handleAddFavorite = async () => {
        if (!isAuthenticated) {
            setIsAuthOpen(true)
        } else {
            toggleFavorite(movie?.id)
            setIsAdded(!isAdded)
        }
    }

    return (
        <>
            <AuthForm isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <TrailerModal id={movie?.id} isOpen={trailer} onClose={() => setTrailer(false)} />
            {loading ? (
                <Load type="box-rotate-z" bgColor={'white'} title={'LOADING...'} size={100} />
            ) : (
                <>
                    <div className={`${styles.random__container} ${movieStyles.movie__container}`}>
                        <div className={styles.left__content}>
                            <div className={styles.random__stats}>
                                <div className={styles.stats__item}>
                                    <div className={styles.random__rating} style={{ backgroundColor: ratingColor(movie.tmdbRating) }}>
                                        <span className={styles.rating__star}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z" fill="white" />
                                            </svg>
                                        </span>
                                        <span className={styles.rating__number}>{movie.tmdbRating}</span>
                                    </div>
                                </div>
                                <div className={styles.stats__item}>
                                    <span className={styles.random__release}>{movie.releaseYear}</span>
                                </div>
                                <div className={styles.stats__item}>
                                    <span className={styles.random__genre}>{showGenres(movie.genres)}</span>
                                </div>
                                <div className={styles.stats__item}>
                                    <span className={styles.random__duration}>{convertRunTime(movie.runtime)}</span>
                                </div>
                            </div>
                            <h1 className={styles.random__title}>
                                {movie.title}
                            </h1>
                            <div className={styles.random__description}>
                                {movie.plot}
                            </div>
                            <div className={styles.buttons__container}>
                                <Button className={styles.random__button} onClick={() => setTrailer(true)}>Трейлер</Button>
                                <Button className={`${styles.random__button} ${movieStyles.movie__like}`} onClick={handleAddFavorite}>
                                    {isAdded ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z" fill="#B4A9FF" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white" />
                                        </svg>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className={styles.right__content}>
                            <ImageComponent path={movie.backdropUrl ? movie.backdropUrl : movie.posterUrl} alt={'MainPage Image'} className={styles.main__image} />
                        </div>
                    </div>
                    <div className={movieStyles.bottom__container}>
                        <div className={movieStyles.movie_description__container}>
                            <h2 className={movieStyles.descr__title}>О фильме</h2>
                            <ul className={movieStyles.descr__list}>
                                <li className={movieStyles.descr__item} key={1} uk-leader="fill: .">
                                    <span className={movieStyles.movie__language}>Язык</span>
                                    <span className={movieStyles.movie__language_res}>{convertLanguage(movie.language) ? convertLanguage(movie.language) : 'Неизвестно'}</span>
                                </li>
                                <li className={movieStyles.descr__item} key={2}>
                                    <span className={movieStyles.movie__budget}>Бюджет</span>
                                    <span className={movieStyles.movie__budget_res}>{formatBudget(movie.budget) ? formatBudget(movie.budget) : 'Неизвестно'}</span>
                                </li>
                                <li className={movieStyles.descr__item} key={3}>
                                    <span className={movieStyles.movie__budget}>Выручка</span>
                                    <span className={movieStyles.movie__budget_res}>{formatBudget(movie.revenue) ? formatBudget(movie.revenue) : 'Неизвестно'}</span>
                                </li>
                                <li className={movieStyles.descr__item} key={4}>
                                    <span className={movieStyles.movie__budget}>Режисер</span>
                                    <span className={movieStyles.movie__budget_res}>{movie.director ? movie.director : 'Неизвестно'}</span>
                                </li>
                                <li className={movieStyles.descr__item} key={5}>
                                    <span className={movieStyles.movie__budget}>Продакшен</span>
                                    <span className={movieStyles.movie__budget_res}>{movie.production ? movie.production : 'Неизвестно'}</span>
                                </li>
                                <li className={movieStyles.descr__item} key={6}>
                                    <span className={movieStyles.movie__budget}>Награды</span>
                                    <span className={movieStyles.movie__budget_res}>{movie.awardsSummary ? movie.awardsSummary : 'Неизвестно'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}