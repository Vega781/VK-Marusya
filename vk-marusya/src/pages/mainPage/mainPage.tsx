import styles from '../../styles/mainPage.module.css'
import { ListTop } from '../../components/ListTop/ListTop'
import { RandomMovie } from '../../components/RandomMovie/RandomMovie'

export const MainPage = () => {
    return (
        <div className={styles.main__container}>
            <RandomMovie />
            <ListTop />
        </div>
    )
}