import { Link } from "react-router-dom"
import { Load } from "../Loader/Loader"
import { ImageComponent } from "../ImageComponent/ImageComponent"
import styles from './FavoriteList.module.css'
import { useEffect, useState, useRef } from "react"
import { MovieType } from "../../types/MovieType"
import { getFavoriteMovies } from "../../api/Movies"
import { listAnimation, movieCardAnimation } from '../../animations/animations'

export const FavoriteList = () => {
    const [list, setList] = useState<MovieType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const listRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const animationPlayedRef = useRef(false);

    useEffect(() => {
        const getByGenre = async () => {
            const movies = getFavoriteMovies()
            setList(await movies);
            setLoading(false);
        };
        getByGenre();
    }, [])

    useEffect(() => {
        if (!loading && listRef.current && !animationPlayedRef.current) {
            const elements = itemRefs.current.filter((ref): ref is HTMLLIElement => ref !== null);
            if (elements.length > 0) {
                listAnimation.stagger(elements);
                animationPlayedRef.current = true;
            }
        }
    }, [loading]);

    const handleMouseEnter = (index: number) => {
        if (itemRefs.current[index]) {
            movieCardAnimation.hover(itemRefs.current[index]!);
        }
    };

    const handleMouseLeave = (index: number) => {
        if (itemRefs.current[index]) {
            movieCardAnimation.unhover(itemRefs.current[index]!);
        }
    };

    return (
        <>
            {loading ? (
                <Load type="box-rotate-z" bgColor={'white'} title={'LOADING...'} size={100} />
            ) : (
                <div className={styles.favorites}>
                    <div className={styles.favorites__container}>
                        <div className={styles.favorites__list_container}>
                            <ul ref={listRef} className={styles.favorites__list}>
                                {Array.isArray(list) && list.map((item, index) => (
                                    <Link to={`/movie/${item.id}`} key={index}>
                                        <li 
                                            ref={el => itemRefs.current[index] = el}
                                            className={styles.favorites__item}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={() => handleMouseLeave(index)}
                                        >
                                            <ImageComponent 
                                                className={styles.favorites__image} 
                                                path={item.posterUrl || 'default-url'} 
                                                alt={`Image ${index + 1}`} 
                                            />
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