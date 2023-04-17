let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function changeSlide(index) {
  slideIndex = index;
  updateSlides();
}

function updateSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[slideIndex].classList.add("active");
}

function autoChangeSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  updateSlides();
  setTimeout(autoChangeSlide, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(autoChangeSlide, 5000);
});