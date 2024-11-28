import { FC, useEffect, useState } from 'react'
import styles from './TrailerModal.module.css'
import { getCurrentMovie } from '../../api/Movies'
import { MovieType } from '../../types/MovieType'
import { Load } from '../Loader/Loader'
import { ModalWindow } from '../ModalWindow/ModalWindow'
import { getTrailerId } from '../../utils/getTrailerId'
import YouTube from 'react-youtube'

export interface ITrailerModalProps {
    id: number
    isOpen: boolean
    onClose: () => void
}

export const TrailerModal: FC<ITrailerModalProps> = ({ id, isOpen, onClose }) => {

    const [video, setVideo] = useState<MovieType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRandomMovie = async () => {
            const res = await getCurrentMovie(String(id));
            setVideo(res);
            setLoading(false);
        };
        fetchRandomMovie();
    }, [id])

    

    return (
        <>
            {isOpen && (
                <ModalWindow modal__content={styles.modal__content} modal__close={styles.modal__close} onClose={onClose}>
                {loading ? (
                    <Load type={'box-rotate-z'} bgColor={'white'} size={100} />
                ) : (
                    <div className={styles.trailer__container}>
                        <YouTube
                            videoId={getTrailerId(video.trailerUrl)}
                            opts={{
                                width: '960',
                                height: '540',
                                playerVars: {
                                    autoplay: 1,
                                    volume: 0.5,
                                },
                            }}
                        />
                    </div>
                )}
            </ModalWindow>
            )}
        </>
    )
}