import { Link } from "react-router-dom"
import { Load } from "../Loader/Loader"
import { ImageComponent } from "../ImageComponent/ImageComponent"
import styles from './FavoriteList.module.css'
import { useEffect, useState } from "react"
import { MovieType } from "../../types/MovieType"
import { getFavoriteMovies } from "../../api/Movies"

export const FavoriteList = () => {
    const [list, setList] = useState<MovieType[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getByGenre = async () => {
            const movies = getFavoriteMovies()
            setList(await movies);
            setLoading(false);
        };
        getByGenre();
    }, [])


    return (
        <>
            {loading ? (
                <Load type="box-rotate-z" bgColor={'white'} title={'LOADING...'} size={100} />
            ) : (
                <div className={styles.favorites}>
                    <div className={styles.favorites__container}>
                        <div className={styles.favorites__list_container}>
                            <ul className={styles.favorites__list}>
                                {Array.isArray(list) && list.map((item, index) => (
                                    <Link to={`/movie/${item.id}`}   key={index}>
                                        <li className={styles.favorites__item} key={index}>
                                            <ImageComponent className={styles.favorites__image} path={
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
        </>
    )
}