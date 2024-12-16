'use client';

import { useState, useEffect } from 'react';
import EpisodeCard from '@/app/components/episodeCard';
import styles from './AnimeEpisodes.module.css';

export default function AnimeEpisodes({
    episodes,
    animeName,
    animeSlug,
    animeBanner,
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isReversed, setIsReversed] = useState(() => {
        // Leer el valor inicial de localStorage
        const storedOrder = localStorage.getItem('episodeOrder');
        return storedOrder === 'reversed';
    });

    useEffect(() => {
        // Sincronizar el estado con localStorage
        localStorage.setItem(
            'episodeOrder',
            isReversed ? 'reversed' : 'normal'
        );
    }, [isReversed]);

    const filteredEpisodes = episodes
        ?.filter((episode) =>
            episode.number.toString().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => (isReversed ? b.id - a.id : a.id - b.id));

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleOrder = () => {
        setIsReversed(!isReversed);
    };

    return (
        <div>
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Buscar episodio..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
                <button onClick={toggleOrder} className={styles.orderButton}>
                    {isReversed ? (
                        <svg viewBox="0 0 24 24">
                            <path d="M11 9H17" /> <path d="M11 5H19" />
                            <path d="M11 13H15" /> <path d="M10 17L7 20L4 17" />
                            <path d="M7 5V19" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24">
                            <g>
                                <path
                                    id="Vector"
                                    d="M4 17H16M4 12H13M4 7H10M18 13V5M18 5L21 8M18 5L15 8"
                                />
                            </g>
                        </svg>
                    )}
                </button>
            </div>
            <div className={styles.episodeList}>
                {filteredEpisodes && filteredEpisodes.length > 0 ? (
                    filteredEpisodes.map((episode) => (
                        <EpisodeCard
                            key={episode.id}
                            episode={episode}
                            animeName={animeName}
                            animeSlug={animeSlug}
                            animeBanner={animeBanner}
                        />
                    ))
                ) : (
                    <p className={styles.messageNotFound}>
                        No se encontraron episodios.
                    </p>
                )}
            </div>
        </div>
    );
}
