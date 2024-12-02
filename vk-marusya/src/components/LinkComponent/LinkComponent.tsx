import { FC } from "react";

export interface ILinkProps {
    children: string | JSX.Element;
    href: string;
    className?: string;
}

export const LinkComponent: FC<ILinkProps> = ({children, href, ...props}) => {
    return (
        <a href={href} {...props}>
            {children}
        </a>
    )
}