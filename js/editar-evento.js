
// Linkar BTN .btn.btn-secondary com a pagina de admin
// altera o valor do atributo "href" para "editar-evento.html
const meuBotao = document.querySelector(".btn.btn-primary");
console.log(meuBotao);

meuBotao.href = 'editar.html';
console.log(meuBotao);

// Importa a função eventLoad do módulo carregar-evento.js
import { eventLoad } from './carregar-evento.js'

// Obtém o parâmetro "id" da URL
const params = new URL(document.location).searchParams;
const idEvent = params.get("id");

// Função para carregar os dados do evento na página
const screenDataLoad = async () => {
    // Opções de formatação da data
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    // Carrega os dados do evento com o id especificado
    const data = await eventLoad(idEvent)
    
    // Atualiza os valores dos elementos do formulário na página
    document.getElementById("nome").value = data.name;
    document.getElementById("banner").value = data.poster;
    document.getElementById("atracoes").value = data.attractions;
    document.getElementById("descricao").value = data.description;
    document.getElementById("data").value = new Date(data.scheduled).toLocaleDateString('pt-BR', options);
    document.getElementById("lotacao").value = data.number_tickets;
}

// Chama a função screenDataLoad para carregar os dados do evento na página
screenDataLoad()

// Função para atualizar os dados do evento no servidor
const updateEvent = async (data) => {
    return fetch(`https://soundgarden-api.vercel.app/events/${idEvent}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.body;
    });
}

// Função para formatar a data e hora do evento para o formato aceito pelo servidor
const formatDate = (data) => {
    const [date, time] = data.split(', ');
    const [day, month, year] = date.split('/');

    return `${year}-${month}-${day}T${time}:00.000Z`
}

// Adiciona um evento de envio de formulário ao formulário na página
const form = document.querySelector("form");
form.addEventListener("submit",async (e) => {
    e.preventDefault();

    // Obtém os valores dos atributos do evento do formulário
    const attractionsValues = form.atracoes.value.split(',');
    const eventToCreate = {
        name: form.nome.value,
        poster:"url-img",
        attractions: attractionsValues,
        description: form.descricao.value,
        scheduled: formatDate(form.data.value),
        number_tickets: form.lotacao.value,
    };

    try {
        // Chama a função updateEvent para atualizar os dados do evento no servidor
        await updateEvent(eventToCreate);

        // Exibe uma mensagem de alerta ao usuário informando que o evento foi atualizado com sucesso
        alert("Evento editado com sucesso")
        // Redireciona o usuário para a página "admin.html"
        window.location.replace("admin.html");
        
    } catch (error) {
        // Exibe uma mensagem de alerta ao usuário informando que ocorreu um erro ao atualizar o evento
        alert("error: "+ error.data +"\nErro ao editar evento. Tente Novamente")
        
    }
});