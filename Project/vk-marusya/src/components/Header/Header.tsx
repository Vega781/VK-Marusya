import styles from './Header.module.css'
import logo from '../../assets/logo.png'
import { Button } from "../Button/Button"
import { SearchBar } from "../SearchBar/SearchBar"
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className={styles.header__container}>
            <Link to="/" className={styles.header__logo}>
                <img className={styles.logo__img} src={logo} alt="" />
            </Link>
            <nav className={styles.nav__bar}>
                <Link to="/" className={styles.nav__links}>Главная</Link>
                <Link to="/genres" className={styles.nav__links}>Жанры</Link>
                <SearchBar className={styles.search__container} />
            </nav>
            <Button className={styles.button} onClick={() => { }}>Войти</Button>
        </div>
    )
}