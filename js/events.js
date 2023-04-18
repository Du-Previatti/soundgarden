


// Função assíncrona que busca a lista de eventos da API e exibe as informações na página.
async function fetchEventos() {
  try {
    // Faz uma requisição para a API para obter a lista de eventos.
    const response = await fetch('https://soundgarden-api.vercel.app/events');
    const data = await response.json(); // Converte a resposta em um objeto JavaScript.

    // Seleciona o container onde os eventos serão exibidos.
    const container = document.querySelector('.container.d-flex');

    // Cria um artigo HTML para cada evento e adiciona ao container.
    container.innerHTML = data.map(evento => `
      <article class="evento card p-5 m-3">
        <h2>${evento.name} - ${new Date(evento.scheduled).toLocaleDateString()}</h2>
        <h4>${evento.attractions.join(', ')}</h4>
        <p>${evento.description}</p>
        <a href="#" class="btn btn-primary">reservar ingresso</a>
      </article>
    `).join('');

  } catch (error) {
    console.error(error); // Exibe qualquer erro que ocorra no console do navegador.
  }
}

// Chama a função fetchEventos para buscar a lista de eventos e exibi-los na página.
fetchEventos();
