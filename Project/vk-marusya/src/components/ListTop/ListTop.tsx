import { FC } from "react";
import { ImageComp } from "../ImageComp/ImageComp";
import styles from './ListTop.module.css'

export interface IListTop {
    items: string[];
    listClassName?: string
    itemClassName?: string
    imageClassName?: string
}

export const ListTop: FC<IListTop> = ({ items, listClassName, itemClassName, imageClassName }) => {
    return (
        <ul className={listClassName}>
            {items.map((item, index) => (
                <li className={itemClassName} key={index}>
                    <span className={styles.top__number}>{index + 1}</span>
                    <ImageComp className={imageClassName} path={item} alt={`Image ${index + 1}`} />
                </li>
            ))}
        </ul>
    )
}