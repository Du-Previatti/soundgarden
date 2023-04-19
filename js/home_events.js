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
        <a href="index.html?id=${evento._id}" class="btn btn-primary">reservar ingresso</a>
      </article>
    `)
    .join('');
}

fetchEventos();

// Obtém o parâmetro "id" da URL
const params = new URL(document.location).searchParams;
const idEvent = params.get("id");


const reservarIngresso = async (body, id) => {
  return fetch(`https://soundgarden-api.vercel.app/bookings`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.body;
  });
}

// Verifica se a variável "idEvent" existe e é verdadeira
if (idEvent) {
  // Imprime o valor da variável "idEvent" no console
  console.log(idEvent);
  
  // Seleciona o elemento com o id "fade" e define sua propriedade "display" como "block"
  fade.style.display = "block";
  
  // Seleciona o elemento com o id "modal" e define sua propriedade "display" como "block"
  modal.style.display = "block";

  // Seleciona o elemento com o id "form-reserva" e armazena-o na variável "reservarForm"
  const reservarForm = document.getElementById('form-reserva');

  // Adiciona um ouvinte de eventos para o evento "submit" no elemento "reservarForm"
  reservarForm.addEventListener("submit", async (e) => {
    // Previne o comportamento padrão do evento "submit"
    e.preventDefault();
    
    // Seleciona o elemento com o id "nome" e armazena o valor de seu campo "value" na variável "nome"
    const nome = document.getElementById("nome").value;
    
    // Seleciona o elemento com o id "email" e armazena o valor de seu campo "value" na variável "email"
    const email = document.getElementById("email").value;
    
    try {
      // Chama a API para obter as informações do evento com o ID especificado
      const response = await fetch(`https://soundgarden-api.vercel.app/events/${idEvent}`);
      const eventData = await response.json();

      // Verifica se há ingressos disponíveis para esse evento
      if (eventData.number_tickets > 0) {
        // Cria um objeto "body" com as informações necessárias para realizar a reserva
        const body = {
          "owner_name": nome,
          "owner_email": email,
          "number_tickets": 1,
          "event_id": idEvent
        };

        // Chama a função "reservarIngresso" com os parâmetros "body" e "idEvent", aguardando sua conclusão
        await reservarIngresso(body, idEvent);

        // Exibe uma mensagem de alerta informando que a reserva foi realizada com sucesso
        alert("Reserva realizada com sucesso");

        // Redireciona o usuário para a página "index.html"
        window.location.replace("eventos.html");
      } else {
        // Exibe uma mensagem de erro informando que não há ingressos disponíveis para esse evento
        alert("Não há ingressos disponíveis para esse evento.");
      }
    } catch (error) {
      // Exibe uma mensagem de alerta informando que ocorreu um erro ao realizar a reserva
      alert("error: " + error.data + "\nErro ao criar reserva. Tente Novamente");
    }
  });
}







