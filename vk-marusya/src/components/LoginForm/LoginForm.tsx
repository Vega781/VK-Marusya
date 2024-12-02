import { useMutation } from '@tanstack/react-query';
import styles from './LoginForm.module.css';
import logo from '../../assets/blacklogo.png';
import { queryClient } from '../../api/queryClient';
import { FC, useState } from 'react';
import { loginUser } from '../../api/Users';
import { isValidEmail } from '../../validators/validateEmail';
import { AxiosError } from 'axios';

interface ILoginFormProps {
    onSuccess: () => void;
    onClose: () => void;
}

export const LoginForm: FC<ILoginFormProps> = ({ onSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const loginMutation = useMutation({
        mutationFn: () => loginUser(email, password),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            onSuccess();
            onClose();
        },
        onError(error: AxiosError) {
            if (error.response?.status === 404) {
                setEmailError('Пользователь с таким email не найден');
            } else {
                setPasswordError('Неверный логин или пароль');
            }
        }
    },
        queryClient
    );

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setEmailError('Некорректный email');
        } else if (password.length < 8) {
            setPasswordError('Пароль должен быть больше 8 символов');
        } else {
            loginMutation.mutate();
        }
    }

    return (
        <form className={styles.login__container}>
            <div className={styles.logo__container}>
                <img className={styles.login__logo} src={logo} alt="Logo" />
            </div>
            <div className={styles.login__form}>
                <div className={styles.box}>
                    <svg className={styles.box__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="black" fillOpacity="0.4" />
                    </svg>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailError('')
                        }}
                        placeholder='Электронная почта' />
                </div>
                {emailError && <span style={{ color: "red" }} >{emailError}</span>}
                <div className={styles.box}>
                    <svg className={styles.box__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z" fill="black" fillOpacity="0.4" />
                    </svg>
                    <input
                        className={styles.input}
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordError('')
                        }}
                        placeholder='Пароль' />
                </div>
                {passwordError && <span style={{ color: "red" }} >{passwordError}</span>}
            </div>
            <button className={styles.login__button} onClick={handleSubmit}>Войти</button>
        </form>
    )
}