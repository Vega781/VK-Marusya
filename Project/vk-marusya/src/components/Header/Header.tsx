import styles from './Header.module.css'
import logo from '../../assets/logo.png'
import { Button } from "../Button/Button"
import { SearchBar } from "../SearchBar/SearchBar"
import { Link } from 'react-router-dom'
import { AuthForm } from '../AuthForm/AuthForm'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export const Header = () => {
    const { isAuthenticated, profile } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenAuth = () => {
        setIsOpen(true)
    }

    return (
        <>
            <AuthForm isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            <div className={styles.header__container}>
                <Link to="/" className={styles.header__logo}>
                    <img className={styles.logo__img} src={logo} alt="" />
                </Link>
                <nav className={styles.nav__bar}>
                    <Link to="/" className={styles.nav__links}>Главная</Link>
                    <Link to="/genres" className={styles.nav__links}>Жанры</Link>
                    <SearchBar className={styles.search__container} />
                </nav>
                {isAuthenticated ?  (
                    <Link to="/profile" className={styles.account__links}>{profile?.name}</Link>
                ) : (
                    <Button className={styles.button} onClick={handleOpenAuth}>Войти</Button>
                )}
            </div>
        </>
    )
}