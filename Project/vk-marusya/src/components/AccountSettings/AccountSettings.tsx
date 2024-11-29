import { FC } from 'react'
import styles from './AccountSettings.module.css'
import { logoutUser, ProfileType } from '../../api/Users'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { queryClient } from '../../api/queryClient'

export interface AccountSettingsProps {
    data: ProfileType
}

export const AccountSettings: FC<AccountSettingsProps> = ({ data }) => {
    
    const initials = `${data?.name[0]}${data?.surname[0]}`.toUpperCase()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutUser()
        localStorage.removeItem('token')
        queryClient.setQueryData(['profile'], null)
        navigate('/')
    }

    return (
        <>
            <div className={styles.settings__bio}>
                <div className={styles.settings__fullname}>
                    <div className={styles.settings__initials}>
                        {initials}
                    </div>
                    <div className={styles.settings__name}>
                        <span className={styles.name__title}>Имя Фамилия</span>
                        <span className={styles.fullname}>{data?.name} {data?.surname}</span>
                    </div>
                </div>
                <div className={styles.email}>
                    <div className={styles.email__icon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="white" />
                        </svg>
                    </div>
                    <div className={styles.email__name}>
                        <span className={styles.email__title}>Электронная почта</span>
                        <span className={styles.email}>{data?.email}</span>
                    </div>
                </div>
            </div>
            <Button className={styles.exit__button} onClick={handleLogout}>Выйти из аккаунта</Button>
        </>
    )
}