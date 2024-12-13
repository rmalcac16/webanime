import { getMostViewedAnimes } from '@/api/services/animeService';
import AnimeCard from '@/app/components/AnimeCard';
import NoData from '@/ui/components/NoData';

export const revalidate = 60;

export const metadata = {
    title: `Lista de Animes Más Vistos • ${process.env.APP_NAME}`,
    description: `Anime Online Gratis, mira los últimos capitulos de los animes más vistos de ${process.env.APP_NAME}`,
    openGraph: {
        title: `Lista de Animes Más Vistos • ${process.env.APP_NAME}`,
        description: `Anime Online Gratis, mira los últimos capitulos de los animes más vistos de ${process.env.APP_NAME}`,
        url: '/latino',
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
        canonical: '/latino',
    },
    referrer: 'origin-when-cross-origin',
};

export default async function Page() {
    const data = await getMostViewedAnimes();

    return (
        <main>
            <h1 className="title">
                <span>Animes más vistos</span>
            </h1>
            {!data.being_watched || data.being_watched.length === 0 ? (
                <NoData />
            ) : (
                <div className="listAnime">
                    {data.being_watched.map((anime) => (
                        <AnimeCard key={anime.id} anime={anime} />
                    ))}
                </div>
            )}
        </main>
    );
}
