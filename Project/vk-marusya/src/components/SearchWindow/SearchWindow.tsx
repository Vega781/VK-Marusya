import { useEffect, useState } from 'react';
import { getMoviesByTitle } from '../../api/Movies'
import styles from './SearchWindow.module.css'
import { MovieType } from '../../types/MovieType';
import { Link } from 'react-router-dom';
import { ratingColor } from '../../utils/ratingColor';
import { convertRunTime } from '../../utils/convertRunTime';
import { showGenres } from '../../utils/showGenres';
import { Load } from '../Loader/Loader';
import { useAppDispatch } from '../../store/hooks';
import { clearText } from '../../store/slices/searchTextSlice';

export const SearchWindow = ({ text }: { text: string }) => {

    const dispatch = useAppDispatch();

    const [list, setList] = useState<MovieType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRandomMovie = async () => {
            const res = await getMoviesByTitle(text);
            setList(res);
            setLoading(false);
        };
        fetchRandomMovie();
    }, [text])

    const handleClearText = () => {
        dispatch(clearText());
    }

    return (
        <div className={styles.window__container}>
            {loading ? (
                <Load type="bubble-top" bgColor={'white'} size={20} />
            ) : (
                <ul className={styles.search__list}>
                    {Array.isArray(list) && list.slice(0, 5).map((item, index) => (
                        <li className={styles.search__item} key={index}>
                            <Link to={`/movie/${item.id}`} className={styles.search__link} onClick={handleClearText}>
                                <div className={styles.item__container}>
                                    <img className={styles.item__img} src={item.posterUrl ? item.posterUrl : 'https://avatars.mds.yandex.net/i?id=ce47ed74489a398ec94aeabb44879dea_l-5319082-images-thumbs&n=13'} alt="" />
                                    <div className={styles.item__descr}>
                                        <div className={styles.descr__top}>
                                            <div className={styles.descr__item}>
                                                <div className={styles.descr__rating} style={{ backgroundColor: ratingColor(item.tmdbRating) }}>
                                                    <span className={styles.rating__star}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z" fill="white" />
                                                        </svg>
                                                    </span>
                                                    <span className={styles.rating__number}>{item.tmdbRating}</span>
                                                </div>
                                            </div>
                                            <div className={styles.descr__item}>
                                                <span className={styles.descr__release}>{item.releaseYear}</span>
                                            </div>
                                            <div className={styles.descr__item}>
                                                <span className={styles.descr__genre}>{showGenres(item.genres)}</span>
                                            </div>
                                            <div className={styles.descr__item}>
                                                <span className={styles.descr__duration}>{convertRunTime(item.runtime)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.descr__bottom}>
                                            <h2 className={styles.descr__title} >{item.title}</h2>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}