import {
    formatEpisodeAvailableCalendar,
    formatEpisodeCalendar,
    tmdbImage,
} from '@/helpers/strings';

import styles from './animeCalendarCard.module.css';
import { getAnimeLink } from '@/helpers/linkUtils';
import { ProgressBarLink } from '@/ui/components/progress-bar';

export default function AnimeCard({ anime }) {
    return (
        <ProgressBarLink
            href={getAnimeLink(anime.slug)}
            className={styles.animeCalendarCard}
            style={{
                backgroundImage: `url(${tmdbImage(anime.banner, 'w300')})`,
            }}
        >
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <span className={styles.episodeNumber}>
                    {formatEpisodeCalendar(
                        anime.lastEpisode,
                        anime.date,
                        anime.broadcast
                    ) || '0'}
                    <b>
                        {formatEpisodeAvailableCalendar(
                            anime.date,
                            anime.broadcast
                        )}
                    </b>
                </span>
                <h2 className={styles.animeTitle}>{anime.name}</h2>
            </div>
        </ProgressBarLink>
    );
}
