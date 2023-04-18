export const eventListById = async (id) => {
    try {
        const response = await fetch(`https://soundgarden-api.vercel.app/events/${id}`);
        if (!response.ok) {
            throw new Error('ERRO: Impossível carregar a lista!');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('ERRO: Falha ao carregar lista!');
    }
};