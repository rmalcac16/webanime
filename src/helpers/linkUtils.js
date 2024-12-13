export function getEpisodeLink(animeSlug, episodeNumber) {
    if (!animeSlug || !episodeNumber) {
        return '/';
    }
    return `/ver/${animeSlug}/${episodeNumber}`;
}

export function getAnimeLink(animeSlug) {
    if (!animeSlug) {
        return '/';
    }
    return `/anime/${animeSlug}`;
}

export function getGenreLink(genre) {
    if (!genre) {
        return '/';
    }
    return `/animes?genre=${genre}`;
}
