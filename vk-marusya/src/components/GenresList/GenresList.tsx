import { useEffect, useRef, useState } from 'react';
import styles from './GenresList.module.css'
import { GenreType } from '../../types/GenreType';
import { getGenresList } from '../../api/Movies';
import { Load } from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { generateNiceGradient } from '../../utils/gradientGenerator';
import { genresListAnimation } from '../../animations/animations';


export const GenresList = () => {
    const [list, setList] = useState<GenreType | null>(null);
    const [loading, setLoading] = useState(true);
    const listRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const animationPlayedRef = useRef(false);

    useEffect(() => {
        const fetchGenresList = async () => {
            const genres = await getGenresList();
            setList(genres);
            setLoading(false);
        };
        fetchGenresList();
    }, [])

    useEffect(() => {
        if (!loading && listRef.current && !animationPlayedRef.current) {
            const elements = itemRefs.current.filter((ref): ref is HTMLLIElement => ref !== null);
            if (elements.length > 0) {
                genresListAnimation.stagger(elements);
                animationPlayedRef.current = true;
            }
        }
    }, [loading])

    const handleMouseEnter = (index: number) => {
        if (itemRefs.current[index]) {
            genresListAnimation.hover(itemRefs.current[index]!);
        }
    };

    const handleMouseLeave = (index: number) => {
        if (itemRefs.current[index]) {
            genresListAnimation.unhover(itemRefs.current[index]!);
        }
    };

    return (
        <div>
            {loading ? (
                <Load type="box-rotate-z" bgColor={'white'} title={'LOADING...'} size={100} />
            ) : (
                <div className={styles.container}>
                    <div className={styles.genres__container}>
                        <h1 className={styles.genres__title}>Жанры фильмов</h1>
                        <ul ref={listRef} className={styles.genres__list}>
                            {Array.isArray(list) && list.map((item, index) => (
                                <li 
                                    ref={el => itemRefs.current[index] = el}
                                    className={styles.genre__item} 
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >
                                    <Link to={`/genres/${item}`} className={styles.genre__link}>
                                        <div 
                                            className={styles.genre__image}
                                            style={{ 
                                                background: generateNiceGradient(),
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
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