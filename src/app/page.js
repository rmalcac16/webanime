import { getReleases } from '@/api/services/episodeService';
import NoData from '@/ui/components/NoData';
import AnimeCard from './components/AnimeCard';
import EpisodeCard from './components/episodeCard';

export const metadata = {
    title: `Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.APP_NAME}`,
    description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.APP_NAME}`,
    openGraph: {
        title: `Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.APP_NAME}`,
        description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.APP_NAME}`,
        url: '/',
        type: 'website',
        locale: 'es_LA',
        images: [
            {
                url: 'https://i.imgur.com/Iof3uSm.jpg',
                width: 640,
                height: 360,
            },
        ],
    },
    alternates: {
        canonical: '/',
    },
    referrer: 'origin-when-cross-origin',
    keywords: [
        'Anime Latino HD',
        'Anime En Español Latino',
        'Anime Subtitulado',
    ],
};

export const revalidate = 60;

export default async function Page() {
    try {
        const data = await getReleases();
        return (
            <main>
                <h1 className="title">
                    <span>Episodios Recientes</span>
                </h1>
                {!data.episodes || data.episodes.length == 0 ? (
                    <NoData />
                ) : (
                    <div className="listEpisode">
                        {data.episodes.map((episode) => (
                            <EpisodeCard
                                key={`${episode.slug}_${episode.number}`}
                                episode={episode}
                            />
                        ))}
                    </div>
                )}
                <h1 className="title">
                    <span>Animes Recientes</span>
                </h1>
                {!data.animes || data.animes.length == 0 ? (
                    <NoData />
                ) : (
                    <div className="listAnime">
                        {data.animes.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                )}
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
