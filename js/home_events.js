const API_URL = 'https://soundgarden-api.vercel.app/events';
const CONTAINER_SELECTOR = '.container.d-flex';
const EVENT_SELECTOR = '.evento';

async function fetchEventos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Não foi possível carregar os eventos.');
    }
    const data = await response.json();

    const container = document.querySelector(CONTAINER_SELECTOR);

    // Remove os elementos anteriores do container
    const eventosAnteriores = container.querySelectorAll(EVENT_SELECTOR);
    eventosAnteriores.forEach(evento => evento.remove());

    // Obtém somente os três primeiros eventos
    const tresPrimeirosEventos = data.slice(0, 3);

    // Adiciona os novos elementos ao container
    container.insertAdjacentHTML('beforeend', renderEventos(tresPrimeirosEventos));
  } catch (error) {
    console.error(error);
    const container = document.querySelector(CONTAINER_SELECTOR);
    container.insertAdjacentHTML('beforeend', '<p>Não foi possível carregar os eventos.</p>');
  }
}

function renderEventos(eventos) {
  return eventos
    .map(evento => `
      <article class="evento card p-5 m-3">
        <h2>${evento.name} - ${new Date(evento.scheduled).toLocaleDateString()}</h2>
        <h4>${evento.attractions.join(', ')}</h4>
        <p>${evento.description}</p>
        <a href="" class="btn btn-primary">reservar ingresso</a>
      </article>
    `)
    .join('');
}

fetchEventos();
