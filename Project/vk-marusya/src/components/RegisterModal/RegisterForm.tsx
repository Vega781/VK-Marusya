import { FC, useState } from "react";
import styles from './RegisteForm.module.css'
import { isValidEmail } from "../../validators/validateEmail";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/Users";
import { queryClient } from "../../api/queryClient";

interface IRegisterFormProps {
    onSuccess: () => void;
}

export const RegisterForm: FC<IRegisterFormProps> = ({ onSuccess }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const [emailError, setEmailError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();
    const [firstNameError, setFirstNameError] = useState<string | undefined>();
    const [lastNameError, setLastNameError] = useState<string | undefined>();

    const registerMutation = useMutation({
        mutationFn: () => registerUser(email, password, firstname, lastname),
    }, queryClient)

    if (registerMutation.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        onSuccess();
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!isValidEmail(email)) {
            setEmailError('Некорректный email');
        } else if (!firstname) {
            setFirstNameError('Заполните поле!')
        } else if (!lastname) {
            setLastNameError('Заполните поле!')
        } else if (!password) {
            setPasswordError('Заполните пароль!')
        } else if (password.length <= 8) {
            setPasswordError('Пароль должен быть больше 8 символов')
        } else if (password !== confirmPassword) {
            setPasswordError('Пароли не совпадают')
        } else {
            registerMutation.mutate();
        }
    }


    return (
        <form className={styles.login__container}>
            <div className={styles.logo__container}>
                <img className={styles.login__logo} src='/whitelogo.svg' alt="Logo" />
            </div>
            <div className={styles.login__form}>
                <div className={styles.box}>
                    <svg className={styles.box__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={e => {
                            setEmail(e.target.value)
                            setEmailError('')
                        }}
                        placeholder='Электронная почта' />
                </div>
                {emailError && <span style={{ color: "red" }} >{emailError}</span>}
                <div className={styles.box}>
                    <svg className={styles.box__svg} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={e => {
                            setFirstName(e.target.value)
                            setFirstNameError('')
                        }}
                        placeholder='Имя' />
                </div>
                {firstNameError && <span style={{ color: "red" }} >{firstNameError}</span>}
                <div className={styles.box}>
                    <svg className={styles.box__svg} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={e => {
                            setLastName(e.target.value)
                            setLastNameError('')
                        }}
                        placeholder='Фамилия' />
                </div>
                {lastNameError && <span style={{ color: "red" }} >{lastNameError}</span>}
                <div className={styles.box}>
                    <svg className={styles.box__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input
                        className={styles.input}
                        type="password"
                        onChange={e => {
                            setPassword(e.target.value)
                            setPasswordError('')
                        }}
                        placeholder='Пароль' />
                </div>
                <div className={styles.box}>
                    <svg className={styles.box__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input
                        className={styles.input}
                        type="password"
                        onChange={e => {
                            setConfirmPassword(e.target.value)
                            setPasswordError('')
                        }}
                        placeholder='Подтвердите пароль' />
                </div>
                {passwordError && <span style={{ color: "red" }} >{passwordError}</span>}
            </div>
            <button className={styles.login__button} onClick={handleSubmit}>Регистрация</button>
        </form>
    )
}