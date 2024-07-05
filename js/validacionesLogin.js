if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ email: "prueba@prueba.com", password: "123" }));
}

// Función para validar el inicio de sesión
function validarLogin() {
    // Obtener los valores de email y password del formulario
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Obtener el usuario desde localStorage
    let storedUser = JSON.parse(localStorage.getItem('user'));

    // Verificar si el usuario existe y las credenciales son correctas
    if (storedUser && email === storedUser.email && password === storedUser.password) {

        window.location.href = "index.html";
    } else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
   
    }
}
loginBtn.addEventListener('click', validarLogin);
