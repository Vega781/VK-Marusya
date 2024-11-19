import { FC } from "react";
import { ImageComp } from "../ImageComp/ImageComp";
import styles from './ListTop.module.css'
import { MovieType } from "../../types/MovieType";

export interface IListTopProps {
    items: MovieType;
    listClassName?: string
    itemClassName?: string
    imageClassName?: string
}

export const ListTop: FC<IListTopProps> = ({ items, listClassName, itemClassName, imageClassName }) => {
    return (
        <ul className={listClassName}>
            {Array.isArray(items) && items.map((item, index) => (
                <li className={itemClassName} key={index}>
                    <span className={styles.top__number}>{index + 1}</span>
                    <ImageComp className={imageClassName} path={item.posterUrl} alt={`Image ${index + 1}`} />
                </li>
            ))}
        </ul>
    )
}