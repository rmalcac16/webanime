import { getEpisodeInfo } from '@/api/services/episodeService';
import styles from './page.module.css';
import { getLanguajeInfoEpisode, tmdbImage } from '@/helpers/strings';
import { getAnimeLink, getEpisodeLink } from '@/helpers/linkUtils';
import VideoPlayer from '@/ui/components/VideoPlayer';
import { encryptString } from '@/helpers/decrypt';
import { headers } from 'next/headers';
import { isMobile } from '@/helpers/isMobile';
import { ProgressBarLink } from '@/ui/components/progress-bar';
import NoData from '@/ui/components/NoData';

export const revalidate = 60;

export function playerIdEncrypted(data, isMobile = false) {
    const normalizedData = Array.isArray(data) ? data : Object.values(data);
    return normalizedData.map((subArray) =>
        subArray
            .filter(
                (player) =>
                    isMobile || player.server.title.toLowerCase() !== 'gamma'
            )
            .map((player) => ({
                ...player,
                videoUrlEncrypted: `${
                    process.env.API_BASE_VIDEOURL
                }/${encryptString(`${player.id}`)}`,
            }))
    );
}

export async function generateMetadata({ params }) {
    try {
        const animeSlug = (await params).animeSlug;
        const episodeNumber = (await params).episodeNumber;

        const data = await getEpisodeInfo(animeSlug, episodeNumber);

        const title = `Ver ${data.anime.name} Capítulo ${data?.number} Sub Español Latino en HD Online • ${process.env.APP_NAME}`;
        const description = `Anime ${data.anime.name} capitulo ${data?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`;

        return {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url: getEpisodeLink(data.anime.slug, data.number),
                type: 'website',
                locale: 'es_LA',
                images: [
                    {
                        url: tmdbImage(data.anime.banner, 'w780'),
                        width: 640,
                        height: 360,
                    },
                ],
            },
            alternates: {
                canonical: getEpisodeLink(data.anime.slug, data.number),
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
        const episodeNumber = (await params).episodeNumber;

        const headersList = await headers();
        const userAgent = headersList.get('user-agent');

        const data = await getEpisodeInfo(animeSlug, episodeNumber);

        return (
            <main>
                <div className={styles.container}>
                    {getLanguajeInfoEpisode(data.players) && (
                        <div className={styles.infoLanguaje}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: getLanguajeInfoEpisode(
                                        data.players
                                    ),
                                }}
                            ></span>
                        </div>
                    )}
                    <div className={styles.playerContainer}>
                        <VideoPlayer
                            data={playerIdEncrypted(
                                data.players,
                                isMobile(userAgent)
                            )}
                        />
                        <div className={styles.bottomPlayer}>
                            <div className={styles.infoCap}>
                                <img
                                    src={tmdbImage(
                                        data.anime.poster,
                                        'w58_and_h87_face'
                                    )}
                                    quality="95"
                                    layout="intrinsic"
                                    loading="lazy"
                                />
                                <div>
                                    <ProgressBarLink
                                        href={getAnimeLink(data.anime.slug)}
                                    >
                                        <h2>{data.anime.name}</h2>
                                    </ProgressBarLink>
                                    <p>{`Episodio ${data.number}`}</p>
                                </div>
                            </div>
                            <div className={styles.navCaps}>
                                {data.anterior && (
                                    <ProgressBarLink
                                        href={getEpisodeLink(
                                            data.anime.slug,
                                            data.anterior.number
                                        )}
                                    >
                                        <svg viewBox="0 0 24 24">
                                            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                                        </svg>
                                        Ep. Anterior{' '}
                                    </ProgressBarLink>
                                )}
                                <ProgressBarLink
                                    href={getAnimeLink(data.anime.slug)}
                                >
                                    <svg viewBox="0 0 24 24">
                                        <path d="M7,13H21V11H7M7,19H21V17H7M7,7H21V5H7M2,11H3.8L2,13.1V14H5V13H3.2L5,10.9V10H2M3,8H4V4H2V5H3M2,17H4V17.5H3V18.5H4V19H2V20H5V16H2V17Z"></path>
                                    </svg>
                                </ProgressBarLink>
                                {data.siguiente && (
                                    <ProgressBarLink
                                        href={getEpisodeLink(
                                            data.anime.slug,
                                            data.siguiente.number
                                        )}
                                    >
                                        Ep. Siguiente{' '}
                                        <svg viewBox="0 0 24 24">
                                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                                        </svg>
                                    </ProgressBarLink>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        return (
            <main>
                <NoData />
            </main>
        );
    }
}
