'use client';

import { useRouter } from 'next/navigation';

import styles from './filters.module.css';
import { getYearNow } from '@/helpers/dateUtils';

export default function Filters({ params }) {
    const router = useRouter();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newParams = { ...params, [name]: value };

        const queryString = new URLSearchParams(newParams).toString();
        router.push(`/animes?${queryString}`);
    };

    return (
        <div className={styles.filters}>
            <div className={styles.filter}>
                <label>Tipo: </label>
                <select
                    name="type"
                    value={params.type ? params.type : ''}
                    onChange={handleFilterChange}
                >
                    <option value="">Todos</option>
                    <option value="tv">Animes</option>
                    <option value="movie">Películas</option>
                    <option value="special">Especiales</option>
                    <option value="ova">OVA</option>
                    <option value="ona">ONA</option>
                </select>
            </div>
            <div className={styles.filter}>
                <label>Estado: </label>
                <select
                    name="status"
                    value={params.status ? params.status : ''}
                    onChange={handleFilterChange}
                >
                    <option value="">Todos</option>
                    <option value="1">En emisión</option>
                    <option value="0">Finalizados</option>
                </select>
            </div>
            <div className={styles.filter}>
                <label>Año: </label>
                <select
                    name="year"
                    value={params.year ? params.year : ''}
                    onChange={handleFilterChange}
                >
                    <option value="">Todos</option>
                    {Array.from({ length: 50 }, (_, i) => (
                        <option key={i} value={getYearNow() - i}>
                            {getYearNow() - i}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.filter}>
                <label>Género: </label>
                <select
                    name="genre"
                    value={params.genre ? params.genre : ''}
                    onChange={handleFilterChange}
                >
                    <option value="">Todos</option>
                    <option value="accion">Acción</option>
                    <option value="aliens">Aliens</option>
                    <option value="artes-marciales">Artes Marciales</option>
                    <option value="aventura">Aventura</option>
                    <option value="ciencia-ficcion">Ciencia Ficción</option>
                    <option value="comedia">Comedia</option>
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="demonios">Demonios</option>
                    <option value="deportes">Deportes</option>
                    <option value="detectives">Detectives</option>
                    <option value="drama">Drama</option>
                    <option value="ecchi">Ecchi</option>
                    <option value="escolar">Escolar</option>
                    <option value="espacio">Espacio</option>
                    <option value="fantasia">Fantasía</option>
                    <option value="gore">Gore</option>
                    <option value="harem">Harem</option>
                    <option value="historico">Histórico</option>
                    <option value="horror">Horror</option>
                    <option value="josei">Josei</option>
                    <option value="juegos">Juegos</option>
                    <option value="kodomo">Kodomo</option>
                    <option value="magia">Magia</option>
                    <option value="maho-shoujo">Maho Shoujo</option>
                    <option value="mecha">Mecha</option>
                    <option value="militar">Militar</option>
                    <option value="misterio">Misterio</option>
                    <option value="musica">Musica</option>
                    <option value="parodia">Parodia</option>
                    <option value="policial">Policial</option>
                    <option value="psicologico">Psicológico</option>
                    <option value="recuentos-de-la-vida">
                        Recuentos De La Vida
                    </option>
                    <option value="romance">Romance</option>
                    <option value="samurais">Samurais</option>
                    <option value="seinen">Seinen</option>
                    <option value="shoujo">Shoujo</option>
                    <option value="shoujo-ai">Shoujo Ai</option>
                    <option value="shounen">Shounen</option>
                    <option value="shounen-ai">Shounen Ai</option>
                    <option value="sobrenatural">Sobrenatural</option>
                    <option value="soft-hentai">Soft Hentai</option>
                    <option value="super-poderes">Super Poderes</option>
                    <option value="suspenso">Suspenso</option>
                    <option value="terror">Terror</option>
                    <option value="vampiros">Vampiros</option>
                    <option value="yaoi">Yaoi</option>
                    <option value="yuri">Yuri</option>
                </select>
            </div>
        </div>
    );
}
