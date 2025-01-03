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
        return JSON.parse(decryptString(data.data));
    } catch (error) {
        throw error;
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
        return JSON.parse(decryptString(data.data));
    } catch (error) {
        throw error;
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
        return JSON.parse(decryptString(data.data));
    } catch (error) {
        throw error;
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
        return JSON.parse(decryptString(data.data));
    } catch (error) {
        throw error;
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
        return JSON.parse(decryptString(data.data));
    } catch (error) {
        throw error;
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
        return JSON.parse(decryptString(data.data));
    } catch (error) {
        throw error;
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
        return JSON.parse(decryptString(data.data));
    } catch (error) {
        throw error;
    }
};
