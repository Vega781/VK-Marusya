import Loader from 'react-js-loader'
import styles from './Loader.module.css'

export interface ILoader {
    type: string;
    bgColor: string;
    title?: string;
    size: number;
}

export const Load = ({ type, bgColor, title, size }: ILoader) => {
    return (
        <div className={styles.loader}>
            <Loader type={type} bgColor={bgColor} title={title} size={size} />
        </div>
    )
}