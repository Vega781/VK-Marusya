import { FC } from "react"
import styles from './Button.module.css'

export interface IButtonProps {
    children: string | JSX.Element;
    className?: string;
    onClick: () => void;
}

export const Button: FC<IButtonProps> = ({children, onClick, ...props}) => {
    return (
        <button className={styles.button} onClick={onClick} {...props}>
            {children}
        </button>
    )
}