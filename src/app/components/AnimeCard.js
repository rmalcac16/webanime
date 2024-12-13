import {
    formatEpisodes,
    getYearByDateString,
    numberFormat,
    tmdbImage,
} from '@/helpers/strings';

import styles from './animeCard.module.css';
import { getAnimeLink } from '@/helpers/linkUtils';
import { ProgressBarLink } from '@/ui/components/progress-bar';

export default function AnimeCard({ anime }) {
    return (
        <ProgressBarLink
            href={getAnimeLink(anime.slug)}
            className={styles.animeCard}
        >
            <div className={styles.imageContainer}>
                <img
                    src={tmdbImage(anime.poster, 'w300')}
                    title={'Ver ' + anime.name + ' Online'}
                    alt={'Ver ' + anime.name + ' Online'}
                    quality="95"
                    layout="intrinsic"
                    loading="lazy"
                />
                <div className={styles.overlay}>
                    {anime.totalviews && (
                        <div className={styles.views}>
                            <svg viewBox="0 0 24 24">
                                <g data-name="Layer 2">
                                    <path d="M12 5C5 5 2 11 2 12s3 7 10 7 10-6 10-7-3-7-10-7zm0 12c-4 0-7-4-8-5 1-1 4-5 8-5s7 4 8 5c-1 1-4 5-8 5z"></path>
                                    <path d="M12 8a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2z"></path>
                                </g>
                            </svg>
                            {numberFormat(anime.totalviews) || '0'}
                        </div>
                    )}
                    {anime.vote_average && (
                        <div className={styles.rating}>
                            {anime.vote_average || '0.00'}
                            <b>★</b>
                        </div>
                    )}
                </div>
                {anime.number && (
                    <div className={styles.episodeNumber}>
                        {formatEpisodes(anime.number) || '0'}
                    </div>
                )}
            </div>
            <h2>{anime.name}</h2>
            <small>{anime.aired && getYearByDateString(anime.aired)}</small>
        </ProgressBarLink>
    );
}
