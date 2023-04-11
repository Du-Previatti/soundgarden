/**
 * API URL
 * https://soundgarden-api.vercel.app/events
 */


const btnEvento = document.querySelector('#btn-submit');

// Função para criar evento
async function criarEvento(nomeEvento, atracoesEvento, descricaoEvento, dataEvento, lotacaoEvento) {
  // Variáveis do formulário
  const response = await fetch('https://soundgarden-api.vercel.app/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nomeEvento,
      attractions: [
        atracoesEvento
      ],
      description: descricaoEvento,
      scheduled: dataEvento,
      number_tickets: lotacaoEvento,
    }),
  });
  const data = await response.json();
  console.log(data);

  document.querySelector('#nome').value = '';
  document.querySelector('#atracoes').value = '';
  document.querySelector('#descricao').value = '';
  document.querySelector('#data').value = '';
  document.querySelector('#lotacao').value = '';
}

btnEvento.addEventListener('click', () => {
  const nomeEvento = document.querySelector('#nome').value;
  const atracoesEvento = document.querySelector('#atracoes').value;
  const descricaoEvento = document.querySelector('#descricao').value;
  const dataEvento = document.querySelector('#data').value;
  const lotacaoEvento = document.querySelector('#lotacao').value;

  if (nomeEvento && atracoesEvento && descricaoEvento && dataEvento && lotacaoEvento) {
    criarEvento(nomeEvento, atracoesEvento, descricaoEvento, dataEvento, lotacaoEvento)
  } else {
    alert('Preencha todos os campos!');
  }
});