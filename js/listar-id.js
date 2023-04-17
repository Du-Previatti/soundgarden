//
export const eventListById = async (id) => {
    return fetch(`https://soundgarden-api.vercel.app/events/${id}`).then(
        (response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Lista o evento, indisponivel');
    }).then((data) => {
       
        return data
    });
};