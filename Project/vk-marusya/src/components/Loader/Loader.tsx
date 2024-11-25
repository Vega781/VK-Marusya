import Loader from 'react-js-loader'
import styles from './Loader.module.css'

export const Load = () => {
    return (
        <div className={styles.loader}>
            <Loader type="box-rotate-z" bgColor={'white'} title={'LOADING...'} size={100} />
        </div>
    )
}