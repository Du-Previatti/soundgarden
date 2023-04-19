const params = new URL(document.location).searchParams;
const idEvent = params.get("id");

const eventReservations = async () => { 
    const reservationsTable = document.querySelector("[data-reservations-table]")
   
  
    return fetch(`https://soundgarden-api.vercel.app/bookings/event/${idEvent}`).then(
        (response) => {
            if (response.ok) {                 
                return response.json();
            }  
            throw new Error("nao foi possivel listar as reservas");      
        }
    ).then((data) => {
        if (data.length > 0) {
            return reservationsTable.innerHTML = data.map((element) =>{
                return `<article class="evento card p-5 m-3" style="min-height: 185px;justify-content: space-between">
                    <h2>${element.owner_name}</h2>
                    <h4>${element.owner_email}</h4>
                    <h5>Ingressos: ${element.number_tickets}</h5>
                </article>`     
                
            }).join('')
        }

        reservationsTable.innerHTML = "Nenhuma reserva para este evento."
    })
}
eventReservations();