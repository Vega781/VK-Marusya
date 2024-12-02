import { useEffect, useState, useRef } from "react";
import { ImageComponent } from "../ImageComponent/ImageComponent";
import styles from '../../styles/mainPage.module.css'
import { MovieType } from "../../types/MovieType";
import { getMovies } from "../../api/Movies";
import { Link } from "react-router-dom";
import { Load } from "../Loader/Loader";
import { listTopAnimation } from "../../animations/animations";

export const ListTop = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [list, setList] = useState<MovieType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopList = async () => {
            const res = await getMovies();
            setList(res);
            setLoading(false);
            
            if (containerRef.current) {
                listTopAnimation.container(containerRef.current);
            }
            if (listRef.current) {
                const items = Array.from(listRef.current.children) as HTMLElement[];
                listTopAnimation.items(items);
            }
        };
        fetchTopList();
    }, [])

    return (
        <div className={styles.top10}>
            <div ref={containerRef} className={styles.top10__container}>
                <h1 className={styles.top10__title}>Топ 10 фильмов</h1>
                {loading ? (
                    <Load type="box-rotate-z" bgColor={'white'} title={'LOADING...'} size={100} />
                ) : (
                    <div className={styles.top10__list_container}>
                        <ul ref={listRef} className={styles.top10__list}>
                            {Array.isArray(list) && list.map((item, index) => (
                                <Link to={`/movie/${item.id}`} key={item.id}>
                                    <li 
                                        className={styles.top10__item}
                                        onClick={(e) => listTopAnimation.highlight(e.currentTarget)}
                                    >
                                        <span className={styles.top__number}>{index + 1}</span>
                                        <ImageComponent className={styles.top10__image} path={
                                            item.posterUrl ? item.posterUrl : 'https://avatars.mds.yandex.net/i?id=ce47ed74489a398ec94aeabb44879dea_l-5319082-images-thumbs&n=13'
                                        } alt={`Image ${index + 1}`} />
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}