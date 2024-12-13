import {
    formatEpisodes,
    getYearByDateString,
    numberFormat,
    tmdbImage,
    typeAnime,
} from '@/helpers/strings';

import styles from './animeSearch.module.css';
import { getAnimeAlt, getAnimeTitle } from '@/helpers/altTitleUtils';
import { getAnimeLink } from '@/helpers/linkUtils';
import { ProgressBarLink } from '@/ui/components/progress-bar';

export default function AnimeSearch({ anime }) {
    return (
        <ProgressBarLink
            className={styles.animeSearchCard}
            alt={getAnimeAlt(anime)}
            title={getAnimeTitle(anime)}
            href={getAnimeLink(anime.slug)}
        >
            <div>
                <img
                    className={styles.poster}
                    alt={getAnimeAlt(anime)}
                    height={50}
                    width={40}
                    quality="95"
                    layout="intrinsic"
                    loading="lazy"
                    src={tmdbImage(anime.poster, 'w58_and_h87_face')}
                />
            </div>
            <div className={styles.content}>
                <p className={styles.title}>{anime.name}</p>
                <p className={styles.type}>{typeAnime(anime.type)}</p>
            </div>
        </ProgressBarLink>
    );
}
