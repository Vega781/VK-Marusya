import styles from '../../styles/MainPage.module.css';
import bygenreStyles from './ListByGenre.module.css'
import { getMoviesByGenre } from '../../api/Movies';
import { useEffect, useState } from 'react';
import { MovieType } from '../../types/MovieType';
import { Link, useParams } from 'react-router-dom';
import { Load } from '../Loader/Loader';
import { ImageComponent } from '../ImageComponent/ImageComponent';

export const ListByGenre = () => {
    const { genre = '' } = useParams();
    const [list, setList] = useState<MovieType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getByGenre = async () => {
            const movies = await getMoviesByGenre(genre);
            setList(movies);
            setLoading(false);
        };
        getByGenre();
    }, [genre])

    return (
        <div className={styles.bygenre__container}>
            {loading ? (
                <Load />
            ) : (
                <div className={styles.top10}>
                    <div className={styles.top10__container}>
                        <Link to='/genres' className={bygenreStyles.back__link}>
                            <h1 className={bygenreStyles.back__h1}>
                                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.047 20.0012L26.2967 28.2507L23.9397 30.6077L13.333 20.0012L23.9397 9.39453L26.2967 11.7515L18.047 20.0012Z" fill="white" />
                                </svg>
                                {genre.charAt(0).toUpperCase() + genre.slice(1)}
                            </h1>
                        </Link>
                        <div className={styles.top10__list_container}>
                            <ul className={styles.top10__list}>
                                {Array.isArray(list) && list.map((item, index) => (
                                    <Link to={`/movie/${item.id}`} className={bygenreStyles.list__item} key={index}>
                                        <li className={styles.top10__item} key={index}>
                                            <ImageComponent className={styles.top10__image} path={
                                                item.posterUrl ? item.posterUrl : 'https://avatars.mds.yandex.net/i?id=ce47ed74489a398ec94aeabb44879dea_l-5319082-images-thumbs&n=13'
                                            } alt={`Image ${index + 1}`} />
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}