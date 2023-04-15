async function fetchEventos() {
    try {
      const response = await fetch('https://soundgarden-api.vercel.app/events');
      const data = await response.json();
  
      const container = document.querySelector('.container.d-flex');
  
      // Verifica se o container já contém elementos
      const eventosAnteriores = container.querySelectorAll('.evento');
      if (eventosAnteriores.length > 0) {
        // Remove os elementos anteriores do container
        eventosAnteriores.forEach(evento => evento.remove());
      }
  
      // Obtém somente os três primeiros eventos
      const tresPrimeirosEventos = data.slice(0, 3);
  
      // Adiciona os novos elementos ao container
      container.insertAdjacentHTML('beforeend', tresPrimeirosEventos.map(evento => `
        <article class="evento card p-5 m-3">
          <h2>${evento.name} - ${new Date(evento.scheduled).toLocaleDateString()}</h2>
          <h4>${evento.attractions.join(', ')}</h4>
          <p>${evento.description}</p>
          <a href="#" class="btn btn-primary">reservar ingresso</a>
        </article>
      `).join(''));
  
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchEventos();
  