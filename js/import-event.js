// Importa a função eventListById do módulo listar-id.js.
import { eventListById }  from './listar-id.js';

//Retorna um objeto de evento com base no ID fornecido.
export const eventLoad = async (id) => {
    const data = await eventListById(id)
    return data;
};