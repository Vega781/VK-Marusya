import { useEffect, useState } from 'react';
import styles from './GenresList.module.css'
import { GenreType } from '../../types/GenreType';
import { getGenresList } from '../../api/Movies';
import { Load } from '../Loader/Loader';
import { Link } from 'react-router-dom';


export const GenresList = () => {
    const [list, setList] = useState<GenreType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGenresList = async () => {
            const genres = await getGenresList();
            setList(genres);
            setLoading(false);
        };
        fetchGenresList();
    }, [])

    return (
        <div>
            {loading ? (
                <Load type="box-rotate-z" bgColor={'white'} title={'LOADING...'} size={100} />
            ) : (
                <div className={styles.container}>
                    <div className={styles.genres__container}>
                        <h1 className={styles.genres__title}>Жанры фильмов</h1>
                        <ul className={styles.genres__list}>
                            {Array.isArray(list) && list.map((item, index) => (
                                <li className={styles.genre__item} key={index}>
                                    <Link to={`/genres/${item}`} className={styles.genre__link}>
                                        <img className={styles.genre__image} src={
                                            item.posterUrl ? item.posterUrl : 'https://avatars.mds.yandex.net/i?id=ce47ed74489a398ec94aeabb44879dea_l-5319082-images-thumbs&n=13'
                                        } alt={`Image ${index + 1}`} />
                                        <div className={styles.item__title}>
                                            <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}