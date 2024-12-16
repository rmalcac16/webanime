'use client';

import { useState, useEffect } from 'react';
import styles from './messageApp.module.css';
import { isMobile } from '@/helpers/isMobile';

export default function MessageApp() {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        // Obtener el user-agent desde el cliente
        const userAgent =
            navigator.userAgent || navigator.vendor || window.opera;

        // Verificar si es un dispositivo móvil
        if (isMobile(userAgent)) {
            const lastShown = localStorage.getItem('messageLastShown');
            const today = new Date().toISOString().split('T')[0];

            if (lastShown !== today) {
                setShowMessage(true);
                localStorage.setItem('messageLastShown', today);
            }
        }
    }, []);

    const handleClose = () => {
        setShowMessage(false);
    };

    if (!showMessage) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.messageContainer}>
                <button onClick={handleClose} className={styles.closeIcon}>
                    x
                </button>
                <div className={styles.messageContent}>
                    <img src="https://i.imgur.com/FNWH8iC.png" alt="App Logo" />
                    <p>
                        Descargar nuestra APP Oficial y disfruta de tus animes
                        favoritos sin restricciones totalmente gratis.
                    </p>
                    <div className={styles.buttons}>
                        <div className={styles.button}>
                            <a
                                href={
                                    'https://github.com/animelhd/kawaii-animes/raw/main/app-release.apk'
                                }
                                alt={'Descargar APP'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Directa
                            </a>
                        </div>
                        <div className={styles.button}>
                            <a
                                href={'https://www.kawaiianimes.app/'}
                                alt={'Descargar APP'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Pagina Oficial
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
