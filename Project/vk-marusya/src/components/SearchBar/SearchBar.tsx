import { FC } from 'react';
import styles from './SearchBar.module.css'
import searchImg from '../../assets/search.png'

export interface ISearchBar {
    className?: string;
}

export const SearchBar: FC<ISearchBar> = ({...props}) => {
    return (
        <div {...props}>
            <img className={styles.search__img} src={searchImg} alt="" />
            <input className={styles.search__bar}
                type="search" 
                placeholder="Поиск" />
        </div>
    )
}