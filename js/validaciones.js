

function validar() {
    let nombreIngresado = document.getElementById("usuario");
    validarTexto(nombreIngresado)

    var contrasenia = document.getElementById("password");
    validarTexto(contrasenia)

    var emailIngresado = document.getElementById("email");
    validarEmail(emailIngresado)
    // Fecha
    validarFecha();
}
function validarTexto(texto) {
    if (texto.value.trim() === "") {
        texto.style.borderColor = "red";
        texto.style.borderWidth = "2px";
        texto.setAttribute("placeholder", "Campo incompleto");

    }
    else {
        texto.style.borderColor = "green";
        texto.style.borderWidth = "2px";

    }
}
function validarEmail(emailText) {
    let email = emailText.value.trim()
    let simbolos = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!simbolos.test(email)) {
        emailText.style.borderColor = "red";
        emailText.setAttribute("placeholder", "Email inválido");
        return false
    } else {
        emailText.style.borderColor = "green";
        return true
    }
}
function validarFecha() {
    let diaIngresado = document.getElementById("dia").value;
    let mesIngresado = document.getElementById("mes").value;
    let anioIngresado = document.getElementById("anio").value;
    if (diaIngresado === "" || mesIngresado === "" || anioIngresado === "") {
        document.getElementById("dia").style.borderColor = "red";
        document.getElementById("mes").style.borderColor = "red";
        document.getElementById("anio").style.borderColor = "red";
        return false;
    }
    let dia = parseInt(diaIngresado);
    let mes = parseInt(mesIngresado);
    let anio = parseInt(anioIngresado);
    let fechaIngresada = new Date(anio, mes - 1, dia);
    let fechaActual = new Date();
    if (fechaIngresada > fechaActual) {
        document.getElementById("dia").style.borderColor = "red";
        document.getElementById("mes").style.borderColor = "red";
        document.getElementById("anio").style.borderColor = "red";
        return false;
    }
    let diasPorMes = [31, esBisiesto(anio) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (dia < 1 || dia > diasPorMes[mes - 1]) {
        document.getElementById("dia").style.borderColor = "red";
        document.getElementById("mes").style.borderColor = "red";
        document.getElementById("anio").style.borderColor = "red";
        return false;
    }
    document.getElementById("dia").style.borderColor = "green";
    document.getElementById("mes").style.borderColor = "green";
    document.getElementById("anio").style.borderColor = "green";
    return true;
}
function esBisiesto(anio) {
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
}
// function registrarUsuario() {
//     let username = document.getElementById('usuario').value;
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
    
//     // Llamar a la función para agregar usuario
//     let registrado = agregarUsuario(username, email, password);

//     // Mostrar mensaje de registro solo si se registró correctamente
//     if (registrado) {
//         mostrarMensajeRegistro('Usuario registrado correctamente.');
//     }

//     // Evitar que el formulario se envíe tradicionalmente
//     return false;
// }