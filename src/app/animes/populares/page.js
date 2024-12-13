import { getPopularAnimes } from '@/api/services/animeService';
import AnimeCard from '@/app/components/AnimeCard';
import NoData from '@/ui/components/NoData';

export const revalidate = 60;

export const metadata = {
    title: `Lista de Animes Populares • ${process.env.APP_NAME}`,
    description: `Anime Online Gratis, mira los últimos capitulos de los animes populares de ${process.env.APP_NAME}`,
    openGraph: {
        title: `Lista de Animes Populares • ${process.env.APP_NAME}`,
        description: `Anime Online Gratis, mira los últimos capitulos de los animes populares de ${process.env.APP_NAME}`,
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
    const data = await getPopularAnimes();

    return (
        <main>
            <h1 className="title">
                <span>Animes Populares</span>
            </h1>
            {!data.popular_today || data.popular_today.length === 0 ? (
                <NoData />
            ) : (
                <div className="listAnime">
                    {data.popular_today.map((anime) => (
                        <AnimeCard key={anime.id} anime={anime} />
                    ))}
                </div>
            )}
        </main>
    );
}
