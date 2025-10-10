// ==== LOGIN SIMPLE ====
document.addEventListener('DOMContentLoaded', () => {
  const exploreBtn = document.getElementById('explore-btn');
  const loginBox = document.getElementById('login-box');
  const loginBtn = document.getElementById('login-btn');
  const loginError = document.getElementById('login-error');
  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.getElementById('main-content');

  exploreBtn.addEventListener('click', () => {
    loginBox.style.display = 'block'; // Mejor usar style.display
  });

  const USER = import.meta.env.VITE_USER;
  const PASS = import.meta.env.VITE_PASS;

  loginBtn.addEventListener('click', () => {
    const u = document.getElementById('user').value.trim();
    const p = document.getElementById('pass').value.trim();

    if (u === USER && p === PASS) {
      introScreen.style.display = 'none';
      mainContent.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      loginError.style.display = 'block';
      setTimeout(() => loginError.style.display = 'none', 3000);
    }
  });
});
// ===== CARRUSEL =====
const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
let index = 0;

function showSlide(i){
  const slides = carousel.children.length;
  index = (i + slides) % slides;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => showSlide(index + 1));
prevBtn.addEventListener("click", () => showSlide(index - 1));
setInterval(() => showSlide(index + 1), 5000);

// ===== MASONRY RESPONSIVE CON NOTAS =====
const images = [
  { src: "img/Foto1.jpg", nota: "8" },
  { src: "img/Fotoboda1.jpg", nota: "10" },
  { src: "img/FotoBoda2.jpg", nota: "9" },
  { src: "img/Fotoboda3.jpg", nota: "8" },
  { src: "img/FotoDaniel.jpg", nota: "2" },
  { src: "img/Fotooporto.jpg", nota: "7" },
  { src: "img/Fotozhen.png", nota: "10" },
  { src: "img/Fotozhenboda.jpg", nota: "10" },
  { src: "img/Navidad.jpg", nota: "10" },
  { src: "img/oporto3.jpg", nota: "6" },
  { src: "img/Patos.jpg", nota: "7" },
  { src: "img/Patos2.jpg", nota: "5" },
  { src: "img/FotoBlanco1.jpg", nota: "6" },
  { src: "img/FotoBlanco2.jpg", nota: "7" },
  { src: "img/Boda4.jpg", nota: "8" },
  { src: "img/fotoguapo.jpg", nota: "10" }
];

const masonry = document.getElementById("masonry");
let columns = [];
let columnsCount = 4;

function createColumns(count){
  masonry.innerHTML = "";
  columns = [];
  for (let i = 0; i < count; i++) {
    const col = document.createElement("div");
    col.className = "masonry-column flex flex-col gap-10";
    masonry.appendChild(col);
    columns.push(col);
  }
}

function populateMasonry(){
  images.forEach((data, index) => {
    const item = document.createElement("div");
    item.className = "masonry-item";

    // Imagen
    const img = document.createElement("img");
    img.src = data.src;
    img.alt = `Foto ${index + 1}`;
    img.className = "rounded-lg w-full h-auto";
    item.appendChild(img);

    // Pregunta (se oculta en móvil)
    const label = document.createElement("p");
    label.className = "text-center text-sm text-gray-700 mt-2 masonry-label";
    label.textContent = "¿Qué nota le das a esta foto?";
    item.appendChild(label);

    // Input
    const input = document.createElement("input");
    input.type = "text";
    input.id = `nota-${index}`;
    input.className = "w-full border rounded px-2 py-1 text-sm mt-1 masonry-input";
    item.appendChild(input);

    // Botón
    const btn = document.createElement("button");
    btn.textContent = "Enviar";
    btn.className = "bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-400 text-sm masonry-btn";
    btn.onclick = () => checkPhotoNote(`nota-${index}`, data.nota, btn);
    item.appendChild(btn);

    // Feedback
    const feedback = document.createElement("p");
    feedback.className = "feedback text-center text-sm font-bold mt-2 hidden masonry-feedback";
    item.appendChild(feedback);

    // Añadir a columna según el número de columnas actual
    const colIndex = index % columnsCount;
    columns[colIndex].appendChild(item);
  });
}

// Detecta tamaño de pantalla y ajusta columnas
function resizeMasonry(){
  if(window.innerWidth < 768){
    columnsCount = 2;
  } else {
    columnsCount = 4;
  }
  createColumns(columnsCount);
  populateMasonry();
  toggleMasonryElements();
}

// Oculta etiquetas, inputs, botones y feedback en móvil
function toggleMasonryElements(){
  const hide = window.innerWidth < 768;
  document.querySelectorAll(".masonry-label, .masonry-input, .masonry-btn, .masonry-feedback")
    .forEach(el => el.style.display = hide ? "none" : "block");
}

// Inicialización
resizeMasonry();
window.addEventListener("resize", resizeMasonry);

// ===== FUNCIONES =====
function checkPhotoNote(inputId, correctNote, btn) {
  const input = document.getElementById(inputId);
  const feedback = btn.nextElementSibling;

  feedback.classList.remove("hidden");

  if (input.value.trim() === correctNote) {
    feedback.textContent = "¡Acertaste la nota! 🎉";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `Fallaste, la nota era ${correctNote}`;
    feedback.style.color = "red";
  }
}

function checkAnswer(inputId, correctAnswer, btn) {
  const input = document.getElementById(inputId);
  const feedback = btn.nextElementSibling;
  
  if(input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    feedback.style.display = 'block';
    feedback.textContent = '+1 chiquipunto';
    feedback.style.color = 'green';
  } else {
    feedback.style.display = 'block';
    feedback.textContent = '¡Qué vergüenza!';
    feedback.style.color = 'red';
  }
}

// ===== CONTADOR =====
const contador = document.getElementById("contador-tiempo");
const fechaInicio = new Date("2024-09-27");

function actualizarContador() {
  const ahora = new Date();
  let totalDias = Math.floor((ahora - fechaInicio) / (1000 * 60 * 60 * 24));

  const anos = Math.floor(totalDias / 365);
  totalDias -= anos * 365;

  const meses = Math.floor(totalDias / 30);
  totalDias -= meses * 30;

  const dias = totalDias;

  contador.textContent = `Llevamos ${anos} años, ${meses} meses y ${dias} días sobreviviendo a nosotros mismos❤️`;
}

setInterval(actualizarContador, 1000);
actualizarContador();

// ===== BOTON SORPRESA =====
const boton = document.getElementById("boton-sorpresa");
const mensaje = document.getElementById("mensaje-secreto");

boton.addEventListener("click", () => {
  mensaje.classList.remove("hidden");
  boton.disabled = true;
  boton.classList.add("opacity-50", "cursor-not-allowed");

  setTimeout(() => {
    mensaje.classList.add("hidden");
  }, 7000);
});
