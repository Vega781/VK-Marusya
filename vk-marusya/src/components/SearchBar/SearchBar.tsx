import { FC, useEffect, useState } from 'react';
import styles from './SearchBar.module.css'
import searchImg from '../../assets/search.png'
import { SearchWindow } from '../SearchWindow/SearchWindow';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchText } from '../../store/slices/searchTextSlice';
import { useSearchParams } from 'react-router-dom';


export interface ISearchBar {
    className?: string;
}

export const SearchBar: FC<ISearchBar> = ({ ...props }) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const textSearch = useAppSelector(state => state.searchText.value);
    const [text, setText] = useState<string>('');
    const [showWindow, setShowWindow] = useState<boolean>(false);
    
    // При монтировании проверяем URL параметры
    useEffect(() => {
        const querySearch = searchParams.get('search') || '';
        if (querySearch) {
            dispatch(setSearchText(querySearch));
        }
    }, [dispatch, searchParams]);
    
    useEffect(() => {
        setText(textSearch);
        setShowWindow(textSearch.length > 0);
        // Синхронизируем URL с состоянием Redux
        setSearchParams(textSearch ? { search: textSearch } : {});
    }, [textSearch, setSearchParams]);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        dispatch(setSearchText(newText));
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