import { useEffect, useState } from "react";
import { ImageComponent } from "../ImageComponent/ImageComponent";
import styles from '../../styles/mainPage.module.css'
import { MovieType } from "../../types/MovieType";
import { getMovies } from "../../api/Movies";
import { Load } from "../Loader/Loader";
import { Link } from "react-router-dom";

export const ListTop = () => {

    const [list, setList] = useState<MovieType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopList = async () => {
            const res = await getMovies();
            setList(res);
            setLoading(false);
        };
        fetchTopList();
    }, [])

    return (
        <div>
            {loading ? (
                <Load />
            ) : (
                <div className={styles.top10}>
                    <div className={styles.top10__container}>
                        <h1 className={styles.top10__title}>Топ 10 фильмов</h1>
                        <div className={styles.top10__list_container}>
                            <ul className={styles.top10__list}>
                                {Array.isArray(list) && list.map((item, index) => (
                                    <Link to={`/movie/${item.id}`} key={item.id}>
                                        <li className={styles.top10__item}>
                                            <span className={styles.top__number}>{index + 1}</span>
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