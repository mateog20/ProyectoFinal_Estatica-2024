// Variables
const canciones = [
  { name: "Higher", src: "musica/higher.mp3" },
  { name: "Goodbye", src: "musica/goodbye.mp3" },
  { name: "Distodd", src: "musica/distodd.mp3" },
];

const nombresCanciones = [
  "Shape of You",
  "Blinding Lights",
  "Roar",
  "Uptown Funk",
  "Dance Monkey",
  "Havana",
  "Someone Like You",
  "Can't Stop the Feeling!",
  "Happy",
  "Perfect",
  "Stairway to Heaven",
  "Bohemian Rhapsody",
  "Smells Like Teen Spirit",
  "Hotel California",
  "Sweet Child O' Mine",
  "Imagine",
  "Livin' on a Prayer",
  "Sweet Home Alabama",
  "Wonderwall",
  "Highway to Hell",
  "De Música Ligera",
  "Persiana Americana",
  "Cuando Pase el Temblor",
  "La Flaca",
  "Corazón Delator",
  "Ella Uso Mi Cabeza Como un Revólver",
  "Prófugos",
  "Lamento Boliviano",
  "El Matador",
  "Oye mi amor",
  "El Duelo",
  "Barro y Fauna",
  "La Llave",
  "Sobredosis de TV",
  "Yo te amo",
  "Casi nunca lo ves",
  "Zona de promesas",
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const barraVolumen = document.getElementById("volumenBar");
const volumenValor = document.getElementById("volumenValor");
const muteBtn = document.getElementById("muteBtn");
const barraProgreso = document.getElementById("progreso");
const tiempoTranscurrido = document.getElementById("tiempo-transcurrido");
const opcionesBtns = document.querySelectorAll(".op");

// Variables del juego
audio.volume = barraVolumen.value / 100;
let tiempoTotal = 0;
let tiempoRestante = 10;
let contadorIntervalo;
let cancionCorrecta = "";
let juegoIniciado = false;
let esPrimeraVez = true;
let cancionesDisponibles = [...canciones]; // Copia de la lista original
let tiempoInicioRonda;
let puntaje = 0;
let contadorRondas = 1;

// Función para iniciar el juego al cargar el DOM
document.addEventListener("DOMContentLoaded", function () {
  mostrarCartelListo();
  actualizarInterfazRonda();
});

// Función para mostrar el cartel de inicio
function mostrarCartelListo() {
  const cartel = document.getElementById("cartelListo");
  cartel.style.display = "block";

  const contenido = document.querySelector(".container");
  if (contenido) {
    contenido.classList.add("difuminar");
  }

  document.getElementById("btnSi").addEventListener("click", function () {
    cartel.style.display = "none";
    if (contenido) {
      contenido.classList.remove("difuminar");
    }
    iniciarReproduccion();
    mostrarOpciones();
  });

  document.getElementById("btnNo").addEventListener("click", function () {
    window.location = "index.html";
  });
}

// Función para iniciar la reproducción de la canción
function iniciarReproduccion() {


  cargarCancion(); // Cargar la primera canción
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  iniciarBarraProgreso();
  iniciarContador();
  mostrarOpciones();
}

// Función para cambiar el modo claro/oscuro
function cambiarModo() {
  document.body.classList.toggle("modo-oscuro");
  const modoOscuroBtn = document.getElementById("modo-oscuro-btn");
  modoOscuroBtn.textContent = document.body.classList.contains("modo-oscuro")
    ? "Modo Claro"
    : "Modo Oscuro";
}


// Función para cargar una canción nueva
function cargarCancion() {
  if (cancionesDisponibles.length === 0) {
    mostrarFinDelJuego();
    return;
  }

  const indice = seleccionarCancionAleatoria();
  cancionCorrecta = cancionesDisponibles[indice];
  audio.src = cancionCorrecta.src;
  audio.load();
}

// Función para seleccionar una canción aleatoria
function seleccionarCancionAleatoria() {
  return Math.floor(Math.random() * cancionesDisponibles.length);
}

// Función para reproducir o pausar la canción con el boton de play/pause
function reproducirCancion() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// Función para iniciar la barra de progreso de la canción
function iniciarBarraProgreso() {
  audio.addEventListener("timeupdate", () => {
    const tiempoActual = audio.currentTime;
    const tiempoTotal = audio.duration;
    if (tiempoTotal > 0) {
      const porcentaje = (tiempoActual / tiempoTotal) * 100;
      barraProgreso.style.width = porcentaje + "%";
      tiempoTranscurrido.textContent = formatearTiempo(tiempoActual);
    }
  });
}

// Función para reiniciar la barra de progreso
function reiniciarBarraProgreso() {
  barraProgreso.style.width = "0%";
  tiempoTranscurrido.textContent = "0:00";
}

// Función para formatear el tiempo en formato mm:ss
function formatearTiempo(tiempo) {
  const minutos = Math.floor(tiempo / 60);
  let segundos = Math.floor(tiempo % 60);
  segundos = segundos < 10 ? "0" + segundos : segundos;
  return minutos + ":" + segundos;
}

// Función para actualizar el volumen del audio
function actualizarVolumen() {
  volumenValor.textContent = Math.round(audio.volume * 100) + "%";
  barraVolumen.value = audio.volume * 100;
}

// Función para mutear o desmutear el audio
function mutear() {
  if (audio.volume > 0) {
    audio.volume = 0; // Mute
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Cambiar ícono a mute
  } else {
    audio.volume = 1; // Desmutear al volumen anterior
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; // Cambiar ícono a volumen normal
  }
  actualizarVolumen();
}

// Función para ajustar el volumen mediante la barra de volumen
function ajustarVolumen() {
  audio.volume = barraVolumen.value / 100;
  actualizarVolumen();
}

// Función para detener el contador
function detenerContador() {
  clearInterval(contadorIntervalo);
}

// Función para mostrar el cartel de tiempo agotado
function mostrarTiempoAgotado() {
  const cartelTiempoAgotado = document.getElementById("tiempo-agotado");
  cartelTiempoAgotado.style.display = "block";

  const reiniciarBtn = document.getElementById("reiniciarBtn");
  reiniciarBtn.addEventListener("click", function () {
    location.reload();
    cancionesDisponibles = [...canciones];
  });
}

// Función para actualizar el contador
function actualizarContador() {
  tiempoRestante--;
  document.getElementById("tiempo-restante").textContent = tiempoRestante;

  if (tiempoRestante <= 0) {
    clearInterval(contadorIntervalo);
    mostrarTiempoAgotado();
  }
}

// Función para iniciar el contador
function iniciarContador() {
  clearInterval(contadorIntervalo);
  tiempoRestante = 10;
  document.getElementById("tiempo-restante").textContent = tiempoRestante;
  contadorIntervalo = setInterval(actualizarContador, 1000);
  tiempoInicioRonda = Date.now();
}
function detenerContador() {
  clearInterval(contadorIntervalo);
}
// Función para reiniciar el contador
function reiniciarContador() {
  clearInterval(contadorIntervalo);
  document.getElementById("tiempo-restante").textContent = "10";
  tiempoRestante = 10;
}

// Función para mostrar las opciones de respuesta
function mostrarOpciones() {
  const opciones = generarOpciones();
  opcionesBtns.forEach((btn, index) => {
    btn.value = opciones[index].name;
    btn.textContent = opciones[index].name;
    btn.onclick = () => verificarRespuesta(opciones[index]);
  });
}

// Función para generar opciones de respuesta (3 incorrectas + 1 correcta)
function generarOpciones() {
  const opciones = [];
  const nombresDisponibles = [...nombresCanciones];

  opciones.push(cancionCorrecta); // Agregar la canción correcta a la lista de opciones

  // Eliminar la canción correcta de la lista de nombres disponibles
  const indiceCorrecta = nombresDisponibles.indexOf(cancionCorrecta.name);
  if (indiceCorrecta !== -1) {
    nombresDisponibles.splice(indiceCorrecta, 1);
  }

  // Seleccionar 3 nombres incorrectos aleatorios
  for (let i = 0; i < 3; i++) {
    const indice = Math.floor(Math.random() * nombresDisponibles.length);
    const nombreIncorrecto = nombresDisponibles.splice(indice, 1)[0];
    opciones.push({ name: nombreIncorrecto });
  }

  opciones.sort(() => Math.random() - 0.5);
  return opciones;
}


// Función para verificar la respuesta seleccionada por el jugador
function verificarRespuesta(respuesta) {
  const tiempoFin = Date.now();
  const elementoPuntaje = document.getElementById("puntos");

  const tiempoTranscurrido = (tiempoFin - tiempoInicioRonda) / 1000; // Convertir a segundos
  let puntos = calcularPuntos(tiempoTranscurrido); // Calcular los puntos basados en el tiempo transcurrido

  // Eliminar la canción correcta de cancionesDisponibles
  if (respuesta.name === cancionCorrecta.name) {
    const index = cancionesDisponibles.findIndex(
      (song) => song.name === cancionCorrecta.name
    );
    if (index !== -1) {
      cancionesDisponibles.splice(index, 1);
    }


    detenerContador();
    audio.pause();
    puntaje += puntos;
    elementoPuntaje.textContent = puntos;
    mostrarResultado(true);
  } else {
    detenerContador();
    audio.pause();
    mostrarResultado(false);
  }
}
// Función para detener el temporizador y calcular los puntos
function calcularPuntos(tiempoTranscurrido) {

  const puntosBase = 10; // Puntos base por respuesta correcta
  const penalizacionPorSegundo = 1; // Puntos a restar por cada segundo transcurrido
  let puntos = Math.trunc(
    puntosBase - tiempoTranscurrido * penalizacionPorSegundo
  );
  return Math.max(puntos, 0); // Asegurar que los puntos no sean negativos
}

// Función para mostrar el resultado de la respuesta (ganador o perdedor)
function mostrarResultado(esCorrecto) {
  const cartelGanador = document.getElementById("ganador");
  const cartelPerdedor = document.getElementById("perdedor");
  const nombreCancionCorrecta = document.getElementById("respuesta-correcta");
  if (esCorrecto) {
    actualizarPuntaje(puntaje);
    cartelGanador.style.display = "block";
    setTimeout(() => {
      cartelGanador.style.display = "none";
      siguienteRonda();
    }, 2000);
  } else {
    nombreCancionCorrecta.textContent = cancionCorrecta.name;
    cartelPerdedor.style.display = "block";
  }
  document.getElementById("salirBtn").addEventListener("click", function () {
    window.location = "index.html";
  });
  document
    .getElementById("reiniciarBtnPerdio")
    .addEventListener("click", function () {
      cancionesDisponibles = [...canciones];
      location.reload();
    });
}

// Función para iniciar la siguiente ronda del juego
function siguienteRonda() {

  reiniciarContador();
  if (cancionesDisponibles.length === 0) {
    mostrarFinDelJuego();
  } else {
    contadorRondas++; // Incrementar el contador de rondas
    actualizarInterfazRonda(); // Actualizar la interfaz con el número de ronda actual
    cargarCancion(); // Cargar la siguiente canción
    mostrarCartelListo(); // Mostrar el cartel para iniciar la siguiente ronda
  }
}

// Función para mostrar el cartel de fin del juego cuando no quedan canciones disponibles
function mostrarFinDelJuego() {
  const cartelFin = document.getElementById("cartelFin");
  cartelFin.style.display = "block";
  audio.pause();
  document.getElementById("finJuego").addEventListener("click", function () {
    window.location = "index.html";
  });
}
function actualizarInterfazRonda() {
  document.getElementById("numero-ronda").textContent = contadorRondas;
}

// Función para actualizar el puntaje del usuario
function actualizarPuntaje(puntosGanados) {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // Actualizar el puntaje total
    currentUser.puntajeTotal = puntosGanados;

    // Actualizar el mejor puntaje si es necesario
    if (puntosGanados > currentUser.mejorPuntaje) {
      currentUser.mejorPuntaje = puntosGanados;
    }

    // Guarda el usuario actualizado en localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    let users = JSON.parse(localStorage.getItem("users"));
    let userIndex = users.findIndex((user) => user.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
}

// Función para resetear el puntaje del usuario actual
function resetearPuntaje() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    currentUser.puntajeTotal = 0;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    // Actualiza la lista de usuarios completa si es necesario
    let users = JSON.parse(localStorage.getItem("users"));
    let userIndex = users.findIndex((user) => user.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
}
// Event listeners para la barra de volumen y botón de mute
barraVolumen.addEventListener("input", ajustarVolumen);
muteBtn.addEventListener("click", mutear);

// Event listener para el botón de reproducción (play/pause)
playBtn.addEventListener("click", function () {
  reproducirCancion();
});

// Cargar la primera canción al iniciar la página
cargarCancion();
