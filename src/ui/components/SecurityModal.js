'use client';

import { useState } from 'react';
import styles from './securityModal.module.css';

export default function SecurityModal() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon}>⚠️</span>
                </div>
                <h2 className={styles.title}>Aviso Importante</h2>
                <div className={styles.text}>
                    <p>
                        Estamos teniendo un problema crítico con la <strong>sincronización de preferencias</strong> (animes guardados y seguimiento). 
                        Las sesiones pueden haberse cerrado y la información podría no aparecer correctamente.
                    </p>
                    <p>
                        No ha sido posible recuperar estos datos desde el servidor, pero es posible que parte de la información aún resida 
                        <strong> localmente en tu dispositivo</strong>.
                    </p>
                    <p>
                        <strong>Tu ayuda es vital:</strong> Si aún tienes la sesión iniciada, <strong>no desinstales la aplicación</strong> ni borres los datos. 
                        Si tu sesión se cerró, intenta no iniciar sesión repetidamente por ahora.
                    </p>
                    <p>
                        Estamos trabajando sin descanso para recuperar la mayor cantidad de información posible. Gracias por tu paciencia.
                    </p>
                </div>
                <button className={styles.button} onClick={() => setIsOpen(false)}>
                    Entendido, mantendré mi sesión
                </button>
            </div>
        </div>
    );
}
