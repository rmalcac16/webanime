import { getEpisodeAlt, getEpisodeTitle } from '@/helpers/altTitleUtils';
import { tmdbImage } from '@/helpers/strings';
import { getDateFromNow } from '@/helpers/dateUtils';

import styles from './episodeCard.module.css';
import { getAnimeLink, getEpisodeLink } from '@/helpers/linkUtils';
import { ProgressBarLink } from '@/ui/components/progress-bar';

export default function EpisodeCard({
    episode,
    animeName = '',
    animeSlug = '',
    animeBanner = '',
}) {
    return (
        <ProgressBarLink
            href={getEpisodeLink(episode.slug || animeSlug, episode.number)}
            className={styles.episodeCard}
        >
            <div className={styles.imageContainer}>
                <img
                    src={tmdbImage(episode.banner || animeBanner, 'w300')}
                    title={getEpisodeTitle(episode)}
                    alt={getEpisodeAlt(episode)}
                    quality="95"
                    layout="intrinsic"
                    loading="lazy"
                />
                <div className={styles.overlay}>
                    <span className={styles.time}>
                        {getDateFromNow(episode.created_at)}
                    </span>
                    <div className={styles.playIcon}>
                        <svg viewBox="0 0 24 24">
                            <path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
                        </svg>
                    </div>
                    <div className={styles.languages}>
                        {episode.languaje == 1 && (
                            <span className={styles.lat}>Español Latino</span>
                        )}
                        {episode.languaje == 2 && (
                            <span className={styles.cast}>Castellano</span>
                        )}
                    </div>
                </div>
                <div
                    href={getAnimeLink(episode.slug)}
                    className={styles.animePoster}
                >
                    <img src={tmdbImage(episode.poster, 'w92')} />
                </div>
            </div>
            <div className={styles.episodeInfo}>
                <h2>{episode.name || animeName}</h2>
                <span>{`Ep. ${episode.number}`}</span>
            </div>
        </ProgressBarLink>
    );
}
