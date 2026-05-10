import { decryptString } from '@/helpers/decrypt';

export const getReleases = async () => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/releases`, {
            cache: 'force-cache',
            next: { revalidate: 5 },
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const decrypted = decryptString(data.data);
        return decrypted ? JSON.parse(decrypted) : { episodes: [], animes: [] };
    } catch (error) {
        console.error('Error fetching releases:', error);
        return { episodes: [], animes: [] };
    }
};

export const getEpisodeInfo = async (slug, episodeNumber) => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/anime/${slug}/episodes/${episodeNumber}`,
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
        console.error('Error fetching episode info:', error);
        return null;
    }
};
