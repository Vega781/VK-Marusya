import styles from './Header.module.css'
import logo from '../../assets/logo.png'
import { Button } from "../Button/Button"
import { Link } from "../Link/Link"
import { SearchBar } from "../SearchBar/SearchBar"

export const Header = () => {
    return (
        <div className={styles.header__container}>
            <a href="/" className={styles.header__logo}>
                <img className={styles.logo__img} src={logo} alt="" />
            </a>
            <nav className={styles.nav__bar}>
                <Link href="/main" className={styles.nav__links}>Главная</Link>
                <Link href="/genre" className={styles.nav__links}>Жанры</Link>
                <SearchBar className={styles.search__container} />
            </nav>
            <Button className={styles.button} onClick={() => { }}>Войти</Button>
        </div>
    )
}