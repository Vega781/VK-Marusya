import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchAnimations } from '../../animations/searchAnimations';
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
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const res = await getMoviesByTitle(text);
                if (Array.isArray(res)) {
                    setList(res);
                } else {
                    setList(null);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                setList(null);
            } finally {
                setLoading(false);
            }
        };

        if (text) {
            fetchMovies();
        } else {
            setList(null);
            setLoading(false);
        }
    }, [text]);

    const handleClearText = () => {
        dispatch(clearText());
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={styles.window__container}
                variants={searchAnimations.container}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {loading ? (
                    <Load type="bubble-top" bgColor={'white'} size={20} />
                ) : Array.isArray(list) && list.length > 0 ? (
                    <motion.ul
                        className={styles.search__list}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {list.map((item, index) => (
                            <motion.li
                                className={styles.search__item}
                                key={item.id || index}
                                variants={searchAnimations.item}
                            >
                                <Link
                                    to={`/movie/${item.id}`}
                                    className={styles.search__link}
                                    onClick={handleClearText}
                                >
                                    <motion.div
                                        className={styles.item__container}
                                        whileHover={searchAnimations.hover}
                                    >
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
                                    </motion.div>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={styles.no_results}
                    >
                        Ничего не найдено
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}