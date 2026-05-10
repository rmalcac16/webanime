import { decryptString } from '@/helpers/decrypt';

export const getAllAnimes = async (params = {}) => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${process.env.API_BASE_URL}/anime/list?${queryString}`;

        const response = await fetch(url, {
            cache: 'force-cache',
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const decrypted = decryptString(data.data);
        return decrypted ? JSON.parse(decrypted) : { data: [], last_page: 1 };
    } catch (error) {
        console.error('Error fetching animes:', error);
        return { data: [], last_page: 1 };
    }
};

export const getAnimeById = async (slug) => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/anime/${slug}`,
            {
                cache: 'force-cache',
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const decrypted = decryptString(data.data);
        return decrypted ? JSON.parse(decrypted) : null;
    } catch (error) {
        console.error('Error fetching anime by ID:', error);
        return null;
    }
};

export const getMostViewedAnimes = async () => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/anime/more-view`,
            {
                cache: 'force-cache',
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const decrypted = decryptString(data.data);
        return decrypted ? JSON.parse(decrypted) : { being_watched: [] };
    } catch (error) {
        console.error('Error fetching most viewed animes:', error);
        return { being_watched: [] };
    }
};

export const getPopularAnimes = async () => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/anime/trending`,
            {
                cache: 'force-cache',
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const decrypted = decryptString(data.data);
        return decrypted ? JSON.parse(decrypted) : { popular_today: [] };
    } catch (error) {
        console.error('Error fetching popular animes:', error);
        return { popular_today: [] };
    }
};

export const getAnimesCastellano = async () => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/anime/castellano`,
            {
                cache: 'force-cache',
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const decrypted = decryptString(data.data);
        return decrypted ? JSON.parse(decrypted) : [];
    } catch (error) {
        console.error('Error fetching castellano animes:', error);
        return [];
    }
};

export const getAnimesLatino = async () => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/anime/latino`,
            {
                cache: 'force-cache',
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const decrypted = decryptString(data.data);
        return decrypted ? JSON.parse(decrypted) : [];
    } catch (error) {
        console.error('Error fetching latino animes:', error);
        return [];
    }
};

export const getAnimesCalendario = async () => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/anime/simulcast`,
            {
                cache: 'force-cache',
                next: { revalidate: 5 },
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const decrypted = decryptString(data.data);
        return decrypted ? JSON.parse(decrypted) : {};
    } catch (error) {
        console.error('Error fetching calendar animes:', error);
        return {};
    }
};
