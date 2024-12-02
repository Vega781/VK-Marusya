import { FC } from "react";

export interface IImageProps {
    path: string;
    alt: string;
    className?: string;
}

export const ImageComponent: FC<IImageProps> = ({ path, alt, ...props }) => {
    return (
        <img src={path} alt={alt} {...props}/>
    )
}