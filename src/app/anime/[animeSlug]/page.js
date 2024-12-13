import { tmdbImage } from '@/helpers/strings';
import styles from './page.module.css';
import { getAnimeById } from '@/api/services/animeService';
import { formatDate } from '@/helpers/dateUtils';
import EpisodeCard from '@/app/components/episodeCard';
import { getAnimeLink, getGenreLink } from '@/helpers/linkUtils';
import NoData from '@/ui/components/NoData';
import { ProgressBarLink } from '@/ui/components/progress-bar';

export const revalidate = 60;

export async function generateMetadata({ params }) {
    try {
        const animeSlug = (await params).animeSlug;
        const data = await getAnimeById(animeSlug);
        const title = `Ver ${data.name} Sub Español Latino en HD Online • ${process.env.APP_NAME}`;
        const description = `${
            data?.overview?.length > 165
                ? data?.overview?.slice(0, 165) + '...'
                : data?.overview
        }`;
        return {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: getAnimeLink(data.slug),
                type: 'website',
                locale: 'es_LA',
                images: [
                    {
                        url: tmdbImage(data.banner, 'w780'),
                        width: 640,
                        height: 360,
                    },
                ],
            },
            alternates: {
                canonical: getAnimeLink(data.slug),
            },
            referrer: 'origin-when-cross-origin',
        };
    } catch (error) {
        return {
            title: `Error al procesar los datos • ${process.env.APP_NAME}`,
        };
    }
}

export default async function Page({ params }) {
    try {
        const animeSlug = (await params).animeSlug;

        const data = await getAnimeById(animeSlug);

        return (
            <div className={styles.animeContainer}>
                <div
                    className={styles.banner}
                    style={{
                        backgroundImage: `url(${tmdbImage(
                            data.banner,
                            'w780'
                        )})`,
                    }}
                >
                    <div className={styles.overlay}></div>
                    <div className={styles.title}>
                        <h1>{data.name}</h1>
                    </div>
                </div>
                <div className={styles.animeInfoContainer}>
                    <div className={styles.animeInfoLeft}>
                        <div className={styles.cover}>
                            <img
                                src={tmdbImage(data.poster, 'w300')}
                                quality="95"
                                layout="intrinsic"
                                loading="lazy"
                            />
                        </div>

                        <div className={styles.animeDetails}>
                            <div className={styles.animeDetailItem}>
                                <span>Avg. Score</span>
                                <small>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path>
                                    </svg>
                                    {data.vote_average || '0.00'}/10
                                </small>
                            </div>
                            <div className={styles.animeDetailItem}>
                                <span>Estado</span>
                                <small>
                                    {data.status == 0
                                        ? 'Finalizado'
                                        : 'En Emisión'}
                                </small>
                            </div>
                            <div className={styles.animeDetailItem}>
                                <span>Clasificación</span>
                                <small>{data.rating}</small>
                            </div>
                            <div className={styles.animeDetailItem}>
                                <span>Estreno</span>
                                <small>{formatDate(data.aired, 'LL')}</small>
                            </div>
                            <div className={styles.animeDetailItem}>
                                <span>Titulos Alternativos</span>
                                <small>{data.name_alternative}</small>
                            </div>
                        </div>
                    </div>
                    <div className={styles.animeInfoRight}>
                        <h1>{data.name}</h1>
                        <div className={styles.genres}>
                            {data.genres &&
                                data.genres.split(',').length > 0 &&
                                data.genres.split(',').map((genre) => (
                                    <ProgressBarLink
                                        href={getGenreLink(genre)}
                                        key={genre}
                                    >
                                        {genre.replace(/-/g, ' ')}
                                    </ProgressBarLink>
                                ))}
                        </div>
                        <p className={styles.overview}>{data.overview}</p>
                        <div className={styles.episodeList}>
                            {data.episodes &&
                                data.episodes.map((episode) => (
                                    <EpisodeCard
                                        key={episode.id}
                                        episode={episode}
                                        animeName={data.name}
                                        animeSlug={animeSlug}
                                        animeBanner={data.banner}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <main>
                <NoData />
            </main>
        );
    }
}
