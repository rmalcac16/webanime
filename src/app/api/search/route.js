import { NextResponse } from 'next/server';
import axios from 'axios';
import { decryptString } from '@/helpers/decrypt';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || query.length < 3) {
        return NextResponse.json(
            { error: 'Min. 3 caracteres requeridos' },
            { status: 400 }
        );
    }

    try {
        const response = await axios.get(
            `${process.env.API_BASE_URL}/anime/search?search=${query}`
        );
        const decryptedData = JSON.parse(decryptString(response.data.data));
        return NextResponse.json(decryptedData);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}
