'use client';

import { useState } from 'react';
import styles from './VidePlayer.module.css';

export function getLanguajes(data) {
    return Object.keys(data);
}

export function convertNumberToLanguaje(number) {
    number = parseInt(number);
    switch (parseInt(number)) {
        case 0:
            return 'Subtitulado';
        case 1:
            return 'Latino';
        case 2:
            return 'Castellano';
        default:
            return 'Desconocido';
    }
}

export function orderByPosition(data) {
    return data.sort((a, b) => a.position - b.position);
}

export default function VideoPlayer({ data }) {
    const [selectedLang, setSelectedLang] = useState(getLanguajes(data)[0]);
    const [selectedIframe, setSelectedIframe] = useState(
        data[selectedLang][0].videoUrlEncrypted
    );

    function onChangeLang(e) {
        setSelectedLang(e.target.value);
        setSelectedIframe(data[e.target.value][0].videoUrlEncrypted);
    }

    function onChangeServer(e) {
        const player = data[selectedLang].find(
            (player) => parseInt(player.id) === parseInt(e.target.value)
        );
        setSelectedIframe(player.videoUrlEncrypted);
    }

    return (
        <div className={styles.playerContainer}>
            <div className={styles.options}>
                <div className={styles.langOptions}>
                    <label>Idioma:</label>
                    <select onChange={onChangeLang}>
                        {getLanguajes(data).map((lang) => (
                            <option key={`server_lang_${lang}`} value={lang}>
                                {convertNumberToLanguaje(lang)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.serverOptions}>
                    <label>Servidor:</label>
                    <select onChange={onChangeServer}>
                        {orderByPosition(data[selectedLang]).map((server) => (
                            <option key={server.id} value={server.id}>
                                {server.server.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.iframeContainer}>
                <iframe
                    className={styles.player}
                    src={selectedIframe}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
