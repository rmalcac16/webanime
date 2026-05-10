'use client';

import { useState } from 'react';
import styles from './securityModal.module.css';

export default function SecurityModal() {
    // El modal siempre estará abierto y no se guardará en localStorage
    const [isOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.iconWrapper}>
                    ⚠️
                </div>
                <h2 className={styles.title}>AVISO IMPORTANTE DE SEGURIDAD</h2>
                <p className={styles.text}>
                    Queremos informarles con total transparencia que nuestra plataforma ha sufrido un incidente de seguridad que resultó en un acceso no autorizado a nuestra base de datos. Admitimos con total responsabilidad que nuestras prácticas y medidas de ciberseguridad previas no fueron lo suficientemente robustas para prevenir esta vulneración, comprometiendo cierta información de usuario. Actualmente, estamos trabajando intensamente para asegurar toda nuestra infraestructura y profesionalizar nuestras defensas para evitar que esto se repita en el futuro. Les recomendamos encarecidamente cambiar sus contraseñas por precaución mientras terminamos de estabilizar el servicio. Agradecemos su lealtad y comprensión ante este desafío.
                </p>
                <button className={styles.button} onClick={() => {}}>
                    De acuerdo
                </button>
            </div>
        </div>
    );
}
