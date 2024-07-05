// Función para obtener la lista de usuarios almacenados en localStorage
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Función para guardar la lista de usuarios en localStorage
function guardarUsuarios(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Función para agregar un nuevo usuario
function agregarUsuario(username, email, password) {
  let users = obtenerUsuarios();

  // Verificar si el nombre de usuario o el email ya están registrados
  if (
    users.some((user) => user.username === username || user.email === email)
  ) {
    mostrarMensajeRegistro("El usuario o el email ya están registrados.");
    return false; // Usuario o email ya existen
  }

  // Agregar el nuevo usuario al array
  let newUser = {
    username: username,
    email: email,
    password: password,
    puntuaciones: [],
    puntajeTotal: 0,
    mejorPuntaje: 0, // Nuevo campo para almacenar el mejor puntaje
  };

  users.push(newUser);

  // Actualizar localStorage con el nuevo array de usuarios
  guardarUsuarios(users);
  mostrarMensajeRegistro("Usuario registrado correctamente.");
  return true; // Usuario registrado correctamente
}
// Función para validar el inicio de sesión
function validarLogin(email, password) {
  let users = obtenerUsuarios();
  let mensajeError = document.getElementById("mensaje-error");

  // Verificar si el usuario existe y las credenciales son correctas
  let foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    // Mostrar el nombre de usuario en la página
    mostrarNombreUsuario(foundUser.username);

    // Guardar el usuario actual en localStorage
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    // Redirigir al usuario a index.html
    window.location.href = "index.html";
    return false; // Usuario autenticado correctamente
  } else {
    // Mostrar mensaje de error
    mensajeError.style.display = "block";
    mensajeError.textContent =
      "Usuario no registrado o credenciales incorrectas.";
    return false;
  }
}

// Función para mostrar el nombre de usuario en la página
function mostrarNombreUsuario(username) {
  let usuarioLogueado = document.getElementById("usuarioLogueado");
  let nombreUsuario = document.getElementById("nombreUsuario");

  if (usuarioLogueado) {
    usuarioLogueado.style.display = "block"; // Mostrar el contenedor del usuario logueado
    nombreUsuario.textContent = username; // Mostrar el nombre de usuario
  }
}

// Función para iniciar sesión desde el formulario
function iniciarSesion() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  return validarLogin(email, password);
}

// Función para registrar un usuario desde el formulario
function registrarUsuario() {
  let username = document.getElementById("usuario").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Llamar a la función para agregar usuario
  let registrado = agregarUsuario(username, email, password);

  // Mostrar mensaje de registro solo si se registró correctamente
  if (registrado) {
    mostrarMensajeRegistro("Usuario registrado correctamente.");
  }

  // Evitar que el formulario se envíe tradicionalmente
  return false;
}
function obtenerUsuariosOrdenadosPorPuntaje() {
  let users = obtenerUsuarios();

  // Ordenar usuarios por mejor puntaje de forma descendente
  users.sort((a, b) => (b.mejorPuntaje || 0) - (a.mejorPuntaje || 0));

  return users;
}
function mostrarMensajeRegistro(mensaje) {
  let registroMensaje = document.getElementById("registroMensaje");
  if (registroMensaje) {
    registroMensaje.textContent = mensaje;
  }
}
