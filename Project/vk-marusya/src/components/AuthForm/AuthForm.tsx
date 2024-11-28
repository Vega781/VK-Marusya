import { FC, useState } from "react";
import styles from './AuthForm.module.css'
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterModal/RegisterForm";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { AuthProps } from '../../types/AuthType'

export const AuthForm: FC<AuthProps> = ({ isOpen, onClose }) => {
    const [authType, setAuthType] = useState<string>("login");

    const handleClick = () => {
        setAuthType((prevState) =>
            prevState === "register" ? "auth" : "register",
        );
    };

    return (
        <>
            {isOpen && (
                <ModalWindow modal__content={styles.modal__content} modal__close={styles.modal__close} onClose={onClose}>
                    <div className={styles.auth__form}>
                        {authType === "register" ? <RegisterForm /> : <LoginForm />}
                        <div className={styles.auth__button}>
                            <button className={styles.authButton} onClick={handleClick}>
                                {authType === "register" ? "Войти" : "Регистрация"}
                            </button>
                        </div>
                    </div>
                </ModalWindow>
            )}
        </>
    );
};
