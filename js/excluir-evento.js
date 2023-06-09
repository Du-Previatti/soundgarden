
// Linkar BTN .btn.btn-secondary com a pagina de admin
// altera o valor do atributo "href" para "editar-evento.html
const meuBotao = document.querySelector(".btn.btn-danger");
console.log(meuBotao);

meuBotao.href = 'excluir-evento.html';
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
const deleteEvent = async () => {
    return fetch(`https://soundgarden-api.vercel.app/events/${idEvent}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: ""
    }).then((response) => {
      return response.body;
    });
}

// Adiciona um evento de envio de formulário ao formulário na página
const form = document.querySelector("form");
form.addEventListener("submit",async (e) => {
    e.preventDefault();

    try {
        // Chama a função deleteEvent para atualizar os dados do evento no servidor
        await deleteEvent();
        
        // Exibe uma mensagem de alerta ao usuário informando que o evento foi atualizado com sucesso
        alert("Evento excluido com sucesso")
        // Redireciona o usuário para a página "admin.html"
        window.location.replace("admin.html");
        
    } catch (error) {
        // Exibe uma mensagem de alerta ao usuário informando que ocorreu um erro ao atualizar o evento
        alert("error: "+ error.data +"\nErro ao excluir evento. Tente Novamente")
        
    }
});