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

// Llenado por defecto de objetos (Inicial)

// Usuarios habilitados en el sistema
let usuariosSistema = [];

fetch('./data/data-usuarios.json')
    .then(response => response.json())
    .then(data => {
        usuariosSistema = data.usuariosSistema;
        toastGamer("Se cargaron con exito los usuarios", "success");
        toastGamer("Usuarios disponibles: \n" + usuariosSistema.map(u => u.usuario + " - " + u.clave).join("\n"));
    })
    .catch(error => {
        toastGamer("Error cargando el JSON", "error");
    });

// Funcion toastify para mostrar mensajes de error o éxito


function toastGamer(mensaje, tipo = "info") {
  let bg = "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(0,0,0,0.9))";
  let border = "1px solid rgba(0,255,255,0.4)";
  let color = "#00ffff";
  let duracion = 10000;

  if (tipo === "error") {
    duracion = 3000;
    bg = "linear-gradient(135deg, rgba(255,0,0,0.15), rgba(0,0,0,0.9))";
    border = "1px solid rgba(255,0,0,0.5)";
    color = "#ff6b6b";
  }

  if (tipo === "success") {
    duracion = 3000;
    bg = "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,0,0,0.9))";
    border = "1px solid #00ffff";
    color = "#00ffff";
  }

  Toastify({
    text: mensaje,
    duration: duracion,
    gravity: "top",
    position: "right",
    close: true,
    style: {
      background: bg,
      color: color,
      border: border,
      borderRadius: "12px",
      backdropFilter: "blur(6px)",
      boxShadow: "0 0 15px rgba(0,255,255,0.4)",
      textShadow: "0 0 5px rgba(0,255,255,0.7)"
    }
  }).showToast();
}

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