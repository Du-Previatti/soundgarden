/**
 * API URL
 * https://soundgarden-api.vercel.app/events
 */


const btnEvento = document.querySelector('#btn-submit');
console.log(btnEvento);

// Função para formatar a data e hora do evento para o formato aceito pelo servidor
const formatDate = (data) => {
  const [date, time] = data.split(', ');
  const [day, month, year] = date.split('/');

  return `${year}-${month}-${day}T${time}:00.000Z`
}

// Função para criar evento
async function criarEvento(nomeEvento, atracoesEvento, descricaoEvento, dataEvento, lotacaoEvento) {
  // Variáveis do formulário
  const posterFixo = "https://as1.ftcdn.net/v2/jpg/01/08/17/48/1000_F_108174890_bPrqlS1Ziz40MUizqKTthmhx3q6jsuSK.jpg";
  const response = await fetch('https://soundgarden-api.vercel.app/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nomeEvento,
      poster: posterFixo,
      attractions: [
        atracoesEvento
      ],
      description: descricaoEvento,
      scheduled: formatDate(dataEvento),
      number_tickets: lotacaoEvento,
    }),
  });
  const data = await response.json();
  console.log(data);
  alert("Evento cadastrado com sucesso!");

  document.querySelector('#nome').value = '';
  document.querySelector('#atracoes').value = '';
  document.querySelector('#descricao').value = '';
  document.querySelector('#data').value = '';
  document.querySelector('#lotacao').value = '';
}

// Adiciona um evento de envio de formulário ao formulário na página
const form = document.querySelector("form");
form.addEventListener("submit",async (e) => {
    e.preventDefault();

    // Obtém os valores dos atributos do evento do formulário
    const nomeEvento = document.querySelector('#nome').value;
    const atracoesEvento = document.querySelector('#atracoes').value;
    const descricaoEvento = document.querySelector('#descricao').value;
    const dataEvento = document.querySelector('#data').value;
    const lotacaoEvento = document.querySelector('#lotacao').value;

    try {
        // Chama a função createEvent para criar os dados do evento no servidor
        if (nomeEvento && atracoesEvento && descricaoEvento && dataEvento && lotacaoEvento) {
          await criarEvento(nomeEvento, atracoesEvento, descricaoEvento, dataEvento, lotacaoEvento);
        }
        else {
          alert('Preencha todos os campos!');
        }
        
        // // Redireciona o usuário para a página "admin.html"
        // window.location.replace("admin.html");
        
    } catch (error) {
        // Exibe uma mensagem de alerta ao usuário informando que ocorreu um erro ao atualizar o evento
        alert("error: "+ error.data +"\nErro ao excluir evento. Tente Novamente")
        
    }
});