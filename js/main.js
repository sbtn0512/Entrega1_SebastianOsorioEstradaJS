// Elementos de la pantalla Login
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');
const lbError = document.querySelector('#errorMsg');
const btnLogin = document.querySelector('#loginButton');
const formLogin = document.querySelector('#loginForm');
const lbUsername = document.querySelector('#lbUsername')

// Creación de constructores

// Constructor Usuarios

function Usuario(id, usuario, clave, rol, carritoPendiente = []) {
    this.id = id;
    this.usuario = usuario;
    this.clave = clave;
    this.rol = rol;
    this.carritoPendiente = carritoPendiente;
}

// Creación de objetos

const usuariosSistema = [];

// Llenado por defecto de objetos (Inicial)

// Usuarios habilitados en el sistema
usuariosSistema.push(new Usuario(1, 'cliente', '1234', 'cliente'))
usuariosSistema.push(new Usuario(1, 'cliente2', '1234', 'cliente', ['sekiro: shadows die twice', 'minecraft', 'grand theft auto v']))
usuariosSistema.push(new Usuario(2, 'vendedor', '4321', 'vendedor'))
usuariosSistema.push(new Usuario(3, 'admin', '3412', 'admin'))

// Inicio del programa

// Login

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    if (usuariosSistema.find(usuarioSistema => usuarioSistema.usuario == inputUser.value.toLowerCase() && usuarioSistema.clave == inputPass.value !== undefined)) {
        localStorage.removeItem('usuario');
        localStorage.setItem('usuario', inputUser.value.toLowerCase());
        sessionStorage.setItem('usuarios', JSON.stringify(usuariosSistema));
        // 🔥 Redirigir al menú
        window.location.href = "pages/menu.html";
    } else {
        lbError.innerHTML = '⚠️ Usuario/clave incorrecto';
        lbError.style.display = "block";
        setTimeout(() => {
            lbError.style.display = "none";
        }, 4000);
    }
})