'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from './paginate.module.css';
import { ProgressBarLink } from '../components/progress-bar';

export default function Paginate({ params, data }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const buildPageUrl = (page) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('page', page); // Actualiza solo el parámetro de la página
        return `/animes?${currentParams.toString()}`;
    };

    return (
        <div className={styles.paginate}>
            {data.prev_page_url && (
                <ProgressBarLink
                    href={buildPageUrl(data.current_page + 1)}
                    ref={(el) => {
                        if (el) {
                            el.style.pointerEvents = 'auto';
                        }
                    }}
                    className={styles.item}
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                    </svg>
                </ProgressBarLink>
            )}

            <ProgressBarLink
                href={buildPageUrl(data.current_page)}
                ref={(el) => {
                    if (el) {
                        el.style.pointerEvents = 'none';
                    }
                }}
                className={`${styles.item} ${styles.active}`}
            >
                {data.current_page}
            </ProgressBarLink>

            {data.next_page_url && (
                <ProgressBarLink
                    href={buildPageUrl(data.current_page + 1)}
                    ref={(el) => {
                        if (el) {
                            el.style.pointerEvents = 'auto';
                        }
                    }}
                    className={styles.item}
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                    </svg>
                </ProgressBarLink>
            )}
        </div>
    );
}
