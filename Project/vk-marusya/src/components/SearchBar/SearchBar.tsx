import { FC, useEffect, useState } from 'react';
import styles from './SearchBar.module.css'
import searchImg from '../../assets/search.png'
import { SearchWindow } from '../SearchWindow/SearchWindow';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchText } from '../../store/slices/searchTextSlice';


export interface ISearchBar {
    className?: string;
}

export const SearchBar: FC<ISearchBar> = ({ ...props }) => {

    const dispatch = useAppDispatch();
    const textSearch = useAppSelector(state => state.searchText.value);
    const [text, setText] = useState<string>('')
    const [showWindow, setShowWindow] = useState<boolean>(false)
    
    useEffect(() => {
        setText(textSearch)
        setShowWindow(textSearch.length > 0)
    }, [textSearch])
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchText(event.target.value));
    };
    
    return (
        <div {...props}>
            <img className={styles.search__img} src={searchImg} alt="" />
            <input className={styles.search__bar}
                type="search"
                placeholder="Поиск"
                value={textSearch}
                onChange={handleInputChange} />
            {showWindow && (
                <SearchWindow text={text} />
            )}
        </div>
    )
}