async function wait() {
    const response = await fetch('https://soundgarden-api.vercel.app/events');
    const data = await response.json();
    exibirEventos(data);
  }
  
  function exibirEventos(eventos) {
    function formatarData(data) {
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const ano = data.getFullYear().toString();
      return `${dia}/${mes}/${ano}`;
    }
  
    eventos.map((item) => {
      window.document.body.innerHTML += `
        <article class="evento card p-5 m-3">
          <h2>${item.name} - ${formatarData(new Date(item.scheduled))}</h2>
          <h4>${item.attractions}</h4>
          <p>${item.description}</p>
          <a href="#" class="btn btn-primary">reservar ingresso</a>
        </article>
      `;
    });
  }
  
  wait();