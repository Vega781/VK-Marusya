import { GenresList } from '../../components/GenresList/GenresList'
import styles from '../../styles/GenresPage.module.css'

export const GenresPage = () => {
    return (
        <div className={styles.genres}>
            <GenresList />
        </div>
    )
}