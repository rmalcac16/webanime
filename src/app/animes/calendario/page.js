import { getAnimesCalendario } from '@/api/services/animeService';
import AnimeCalendarCard from '@/app/components/AnimeCalendarCard';
import { getOrderedDays } from '@/helpers/strings';
import NoData from '@/ui/components/NoData';

export const revalidate = 5;

export const metadata = {
    title: `Calendario de animes • ${process.env.APP_NAME}`,
    description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.APP_NAME}`,
    openGraph: {
        title: `Calendario de animes • ${process.env.APP_NAME}`,
        description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.APP_NAME}`,
        url: '/calendario',
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
        canonical: '/calendario',
    },
    referrer: 'origin-when-cross-origin',
};

export default async function Page() {
    try {
        const data = await getAnimesCalendario();
        const orderedDays = getOrderedDays();

        return (
            <main>
                <h1 className="title">
                    <span>Calendario de animes</span>
                </h1>
                <div className="calendar">
                    {orderedDays.map(({ int: dayInt, string: dayString }) =>
                        data[dayInt] ? (
                            <div key={dayInt}>
                                <div className="calendarDay">
                                    <h2>{dayString}</h2>
                                    <span></span>
                                </div>
                                <div className="calendarData">
                                    {data[dayInt].map((anime) => (
                                        <AnimeCalendarCard
                                            key={anime.id}
                                            anime={anime}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : null
                    )}
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
