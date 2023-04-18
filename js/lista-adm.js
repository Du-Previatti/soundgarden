
//Formata a data de acordo com o padrão DD/MM/AAAA HH:MM.
const formatDateHourMinute = (isoDate) => {

    // Converte a data no formato ISO 8601 para um objeto Date.
    const date = new Date(isoDate);
    // Extrai o dia, mês, ano, horas e minutos da data e formata cada valor para uma string com 2 dígitos.
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // Retorna a data formatada.
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Faz uma requisição para a API de eventos e exibe uma tabela com os eventos retornados.
 */
const eventList = async () => {
    // Seleciona o elemento da tabela de eventos.
    const eventsTable = document.querySelector("[data-events-table]");

    try {
        // Faz uma requisição GET para a API de eventos.
        const response = await fetch("https://soundgarden-api.vercel.app/events");
        // Verifica se a requisição foi bem-sucedida.
        if (!response.ok) {
            throw new Error("Não foi possível listar os eventos.");
        }
        // Converte a resposta em JSON.
        const data = await response.json();
        // Seleciona o elemento tbody da tabela de eventos.
        const tbody = document.querySelector("tbody");
        // Cria uma linha na tabela para cada evento retornado pela API.
        data.forEach((dataEvento) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <th scope="row">${dataEvento._id}</th>
                <td>${formatDateHourMinute(dataEvento.scheduled)}</td>
                <td>${dataEvento.name}</td>
                <td>${dataEvento.attractions.join(", ")}</td>
                <td>
                <a href="reservas.html?id=${dataEvento._id}" class="btn btn-dark">ver reservas</a>
                <a href="editar.html?id=${dataEvento._id}" class="btn btn-secondary">editar</a>
                <a href="excluir-evento.html?id=${dataEvento._id}" class="btn btn-danger">excluir</a>
              </td>
              `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
};

// Chama a função eventList para exibir a lista de eventos.
eventList();
