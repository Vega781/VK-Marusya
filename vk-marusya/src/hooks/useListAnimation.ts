import { useEffect, useRef } from 'react';
import { staggerChildren } from '../animations/animations';

export const useListAnimation = () => {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (listRef.current) {
            staggerChildren(listRef.current, '[data-animate="true"]');
        }
    }, []);

    return listRef;
};