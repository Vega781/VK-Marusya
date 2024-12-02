import { FC, useEffect, useRef } from 'react'
import { modalAnimation } from '../../animations/animations'
import styles from './ModalWindow.module.css'

export interface IModalProps {
    modal__content: string;
    modal__close: string;
    children?: React.ReactNode;
    onClose: () => void;
}

export const ModalWindow: FC<IModalProps> = ({modal__content, modal__close, children, onClose}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            modalAnimation.show(modalRef.current);
        }
    }, []);

    const handleClose = async () => {
        if (modalRef.current) {
            await modalAnimation.hide(modalRef.current);
            onClose();
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modal__wrapper}>
                <div ref={modalRef} className={modal__content}>
                    <button className={modal__close} onClick={handleClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" fill="black" />
                        </svg>
                    </button>
                    {children}
                </div>
            </div>
        </div>
    )
}