const formatDateHourMinute = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  
  const eventList = async () => {
    const eventsTable = document.querySelector("[data-events-table]");
  
    try {
      const response = await fetch("https://soundgarden-api.vercel.app/events");
      if (!response.ok) {
        throw new Error("Não foi possível listar os eventos.");
      }
      const data = await response.json();
      const tbody = document.querySelector("tbody");
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
  
  eventList();
  