export function tmdbImage(path, size) {
    return `https://media.themoviedb.org/t/p/${size}${path}`;
}

export function getYearByDateString(date) {
    if (typeof date === 'string') {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate)) {
            return parsedDate.getFullYear();
        }
    }
    return 'No definido';
}

export const typeAnime = (type) => {
    const lowerCaseType = type.toLowerCase();
    return (
        {
            tv: 'Anime',
            movie: 'Película',
            ova: 'OVA',
            special: 'Especial',
            ona: 'ONA',
        }[lowerCaseType] || type
    );
};

export function numberFormat(number = 1) {
    if (typeof number === 'string') {
        number = parseInt(number, 10);
    }
    const units = ['B', 'M', 'K'];
    const divisors = [1000000000, 1000000, 1000];
    for (let i = 0; i < divisors.length; i++) {
        if (number >= divisors[i]) {
            return (
                (number / divisors[i]).toFixed(1).replace('.0', '') + units[i]
            );
        }
    }
    if (number >= 100) {
        return (number / 1000).toFixed(1).replace('.0', '') + 'K';
    }
    return number.toString();
}

export function formatEpisodes(episodeNumber = 0) {
    return `${episodeNumber} episodio${episodeNumber > 1 ? 's' : ''}`;
}

export function formatEpisodeCalendar(
    episodeNumber = 0,
    episodeCreated = '',
    broadcast = 0
) {
    const now = new Date();
    const todayIndex = now.getDay() === 0 ? 7 : now.getDay();
    const createdDate = new Date(episodeCreated);
    if (
        todayIndex === broadcast &&
        createdDate.toDateString() === now.toDateString()
    ) {
        return `Episodio ${episodeNumber}`;
    }

    return `Episodio ${episodeNumber + 1}`;
}

export function formatEpisodeAvailableCalendar(
    episodeCreated = '',
    broadcast = 0
) {
    const now = new Date();
    const todayIndex = now.getDay() === 0 ? 7 : now.getDay();

    if (todayIndex == broadcast) {
        const createdDate = new Date(episodeCreated);
        if (createdDate.toDateString() === now.toDateString()) {
            return ` · Ya disponible`;
        }
        return ' · Próximamente';
    } else {
        return null;
    }
}

export function getOrderedDays() {
    const daysOfWeek = [
        { int: 1, string: 'lunes' },
        { int: 2, string: 'martes' },
        { int: 3, string: 'miércoles' },
        { int: 4, string: 'jueves' },
        { int: 5, string: 'viernes' },
        { int: 6, string: 'sábado' },
        { int: 7, string: 'domingo' },
    ];

    const todayIndex = new Date().getDay();

    const todayAdjusted = todayIndex === 0 ? 7 : todayIndex;

    const tomorrowIndex = (todayAdjusted % 7) + 1;

    const orderedDays = [
        {
            ...daysOfWeek.find((day) => day.int === todayAdjusted),
            string: 'hoy',
        },
        {
            ...daysOfWeek.find((day) => day.int === tomorrowIndex),
            string: 'mañana',
        },
        ...daysOfWeek.filter(
            (day) => day.int !== todayAdjusted && day.int !== tomorrowIndex
        ),
    ];

    return orderedDays;
}

export function getLanguajeInfoEpisode(players) {
    const keys = Object.keys(players);

    const hasLatino = keys.includes('1');
    const hasCastellano = keys.includes('2');

    if (hasLatino && hasCastellano) {
        return 'Este capítulo está disponible en <strong>Español Latino</strong> y <strong>Castellano</strong>';
    } else if (hasLatino) {
        return 'Este capítulo está disponible en <strong>Español Latino</strong>';
    } else if (hasCastellano) {
        return 'Este capítulo está disponible en <strong>Castellano</strong>';
    } else {
        return '';
    }
}
