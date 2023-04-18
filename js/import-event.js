import { eventListById }  from './listar-id.js';

export const eventLoad = async (id) => {
    const data = await eventListById(id)
    return data;
};