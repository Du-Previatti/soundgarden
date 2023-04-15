// Selecionando elementos do HTML
const buttonReservIng = document.querySelectorAll('.btn.btn-primary');
const buttonReservar = document.querySelector('#button-reservar')
const fade = document.querySelector('#fade')
const modal = document.querySelector('#modal')

let buttonArray = Array.from(buttonReservIng);

buttonArray.addEventListener('click', () => {
    fade.style.display = 'block'
    modal.style.display = 'block'
})