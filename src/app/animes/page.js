import { getAllAnimes } from '@/api/services/animeService';
import AnimeCard from '@/app/components/AnimeCard';
import NoData from '@/ui/components/NoData';
import Filters from '@/ui/shared/Filters';
import Paginate from '@/ui/shared/Paginate';

export const revalidate = 60;

export const metadata = {
    title: `Lista de animes • ${process.env.APP_NAME}`,
    description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.APP_NAME}`,
    openGraph: {
        title: `Lista de animes • ${process.env.APP_NAME}`,
        description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.APP_NAME}`,
        url: '/animes',
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
        canonical: '/animes',
    },
    referrer: 'origin-when-cross-origin',
};

export default async function Page(props) {
    const searchParams = await props.searchParams;

    const data = await getAllAnimes(searchParams);

    return (
        <main>
            <h1 className="title">
                <span>Listado de Animes</span>
            </h1>

            <Filters params={searchParams} />

            {!data || data.data.length === 0 ? (
                <NoData />
            ) : (
                <>
                    <div className="listAnime">
                        {data.data.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                    <Paginate params={searchParams} data={data} />
                </>
            )}
        </main>
    );
}
