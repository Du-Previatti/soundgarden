//Retorna um evento específico da lista de eventos com base no ID fornecido

import { eventListById }  from './listar-id.js';

export const eventLoad = async (id) => {
    const data = await eventListById(id)
    return data;
};