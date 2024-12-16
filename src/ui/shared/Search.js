'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Para la navegación programática
import axios from 'axios';
import styles from './search.module.css';
import AnimeSearch from '@/app/components/AnimeSearch';

export default function Search() {
    const [isVisible, setIsVisible] = useState(false);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const router = useRouter(); // Instancia del router

    let cancelTokenSource = null;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);

            if (cancelTokenSource) {
                cancelTokenSource.cancel('Cancelando la solicitud anterior');
            }

            cancelTokenSource = axios.CancelToken.source();

            try {
                const response = await axios.get(`/api/search`, {
                    params: { query: debouncedQuery },
                    cancelToken: cancelTokenSource.token,
                });
                setResults(response.data || []);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Solicitud cancelada:', error.message);
                } else {
                    console.error('Error fetching search results:', error);
                    setResults([]);
                }
            } finally {
                setLoading(false);
            }
        };

        if (debouncedQuery.length >= 3) {
            fetchResults();
        } else {
            setResults([]);
        }

        return () => {
            if (cancelTokenSource) {
                cancelTokenSource.cancel();
            }
        };
    }, [debouncedQuery]);

    const toggleSearch = () => {
        setIsVisible(!isVisible);
        if (debouncedQuery) {
            setQuery('');
            setResults([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita el comportamiento por defecto del Enter
            if (query.length >= 3) {
                if (cancelTokenSource) {
                    cancelTokenSource.cancel(); // Cancela la búsqueda activa
                }
                router.push(`/animes?search=${encodeURIComponent(query)}`);
            }
        }
    };

    return (
        <div className={styles.searchContainer}>
            <svg onClick={toggleSearch} viewBox="0 0 24 24">
                <path d="M13.262,14.868l2.479,2.478c-0.376,0.725-0.415,1.445-0.017,1.843l4.525,4.526 c0.571,0.571,1.812,0.257,2.768-0.7c0.956-0.955,1.269-2.195,0.697-2.766l-4.524-4.526c-0.399-0.398-1.119-0.36-1.842,0.016 l-2.48-2.478L13.262,14.868z M8.5,0C3.806,0,0,3.806,0,8.5C0,13.194,3.806,17,8.5,17S17,13.194,13.194,8.5C17,3.806,13.194,0,8.5,0z M8.5,15C4.91,15,2,12.09,2,8.5S4.91,2,8.5,2S15,4.91,15,8.5S12.09,15,8.5,15z"></path>
            </svg>
            {isVisible && (
                <>
                    <div className={styles.boxContainer}>
                        <div className={styles.inputContainer}>
                            <input
                                id="search"
                                name="search"
                                className={styles.input}
                                type="text"
                                placeholder="Buscar..."
                                autoComplete="on"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown} // Maneja el evento de Enter
                            />
                        </div>
                        <div className={styles.close}>
                            <svg viewBox="0 0 24 24" onClick={toggleSearch}>
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg>
                        </div>
                        <div className={styles.results}>
                            {results.length > 0 && (
                                <>
                                    {results.map((anime, index) => (
                                        <AnimeSearch
                                            key={index}
                                            anime={anime}
                                        />
                                    ))}
                                </>
                            )}

                            <div className={styles.empty}>
                                {debouncedQuery.length < 3
                                    ? 'Min. 3 caracteres'
                                    : loading
                                    ? 'Cargando...'
                                    : results.length === 0
                                    ? 'Sin resultados'
                                    : 'Resultados para ' + debouncedQuery}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
