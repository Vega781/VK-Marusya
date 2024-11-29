import { FC, useState } from "react";
import styles from './AuthForm.module.css'
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterModal/RegisterForm";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { AuthProps } from '../../types/AuthType'
// import { useNavigate } from "react-router-dom";
import { queryClient } from "../../api/queryClient";

export const AuthForm: FC<AuthProps> = ({ isOpen, onClose }) => {
    const [authType, setAuthType] = useState<string>("login");
    // const navigate = useNavigate();

    const handleClick = () => {
        setAuthType((prevState) =>
            prevState === "register" ? "auth" : "register",
        );
    };

    const handleAuthSuccess = () => {
        setAuthType('register')
        queryClient.invalidateQueries({ queryKey: ['profile'] });
    };
    
    const handleAuthClose = () => {
        onClose();
    }

    return (
        <>
            {isOpen && (
                <ModalWindow modal__content={styles.modal__content} modal__close={styles.modal__close} onClose={onClose}>
                    <div className={styles.auth__form}>
                        {authType === "register" ? <RegisterForm onSuccess={handleAuthSuccess} /> : <LoginForm onSuccess={handleAuthSuccess} onClose={handleAuthClose} />}
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
