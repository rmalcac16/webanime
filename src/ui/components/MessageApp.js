'use client';

import { useState, useEffect } from 'react';
import styles from './messageApp.module.css';
import { isMobile } from '@/helpers/isMobile';

export default function MessageApp() {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (isMobile(userAgent)) {
            const hasInteracted = localStorage.getItem('messageInteracted');
            if (!hasInteracted) {
                setShowMessage(true);
            }
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('messageInteracted', 'true');
        setShowMessage(false);
    };

    if (!showMessage) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.messageContainer}>
                <button onClick={handleClose} className={styles.closeIcon}>x</button>
                <div className={styles.messageContent}>
                    <img src="https://i.imgur.com/FNWH8iC.png" alt="App Logo" />
                    <p>Descargar nuestra APP Oficial y disfruta de tus animes favoritos sin restricciones totalmente gratis.</p>
                    <div className={styles.buttons}>
                        <div className={styles.button}>
                            <a
                                href="https://github.com/animelhd/kawaii-animes/raw/main/app-release.apk"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleClose}
                            >
                                Directa
                            </a>
                        </div>
                        <div className={styles.button}>
                            <a
                                href="https://www.kawaiianimes.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleClose}
                            >
                                Página Oficial
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
