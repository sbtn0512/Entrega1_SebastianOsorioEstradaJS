const lbUsername = document.querySelector('#lbUsername');
const contenido = document.querySelector('#contenido');
const contenedor = document.querySelector('#menuOpciones');

// Variables

const usuariosSistema = JSON.parse(sessionStorage.getItem('usuarios'));
const usuarioLogueado = devolverUsuario();
const inventarioVideojuegos = [];

// Opciones por rol
const opciones = {
    cliente: [
        { titulo: "Vender Juego", icono: "🎯" },
        { titulo: "Revisar Mis Ventas", icono: "🛒" },
        { titulo: "Alquilar Juego", icono: "👤" },
        { titulo: "Comprar Juego", icono: "📞" }
    ],
    vendedor: [
        { titulo: "Aprobar Juegos", icono: "💰" },
        { titulo: "Añadir Inventario", icono: "📦" },
        { titulo: "Ver Inventario", icono: "📦" }
    ],
    admin: [
        { titulo: "Usuarios", icono: "👥" },
        { titulo: "Reportes", icono: "📊" },
        { titulo: "Configuración", icono: "⚙️" }
    ]
};

// Constructor videojuegos

function Videojuegos(id, nombre, anio, genero, plataforma, cuentaOnline, existencias = 0, precio = 0, ingresoSistema = false) {
    this.id = id;
    this.nombre = nombre;
    this.anio = anio;
    this.genero = genero;
    this.plataforma = plataforma;
    this.cuentaOnline = cuentaOnline;
    this.precio = precio;
    this.ingresoSistema = ingresoSistema;
    this.existencias = existencias;
}

// Videojuegos habilitados en el sistema

inventarioVideojuegos.push(new Videojuegos(1, 'the legend of zelda: breath of the wild', 2017, 'aventura', 'nintendo switch', false, 14, 220000, false));
inventarioVideojuegos.push(new Videojuegos(2, 'grand theft auto v', 2013, 'acción', 'ps5', true, 7, 180000, false));
inventarioVideojuegos.push(new Videojuegos(3, 'minecraft', 2011, 'sandbox', 'pc', true, 19, 120000, true));
inventarioVideojuegos.push(new Videojuegos(4, 'fifa 23', 2022, 'deportes', 'ps5', true, 3, 210000, true));
inventarioVideojuegos.push(new Videojuegos(5, 'the witcher 3: wild hunt', 2015, 'rpg', 'pc', false, 11, 90000, false));
inventarioVideojuegos.push(new Videojuegos(6, 'sekiro: shadows die twice', 2019, 'acción-aventura', 'ps5', false, 12, 200000, true));
inventarioVideojuegos.push(new Videojuegos(7, 'among us', 2018, 'party', 'pc', true, 16, 20000, true));
inventarioVideojuegos.push(new Videojuegos(8, 'hollow knight', 2017, 'metroidvania', 'pc', false, 9, 60000, true));
inventarioVideojuegos.push(new Videojuegos(9, 'animal crossing: new horizons', 2020, 'simulación', 'nintendo switch', true, 2, 230000, false));
inventarioVideojuegos.push(new Videojuegos(10, 'red dead redemption 2', 2018, 'acción-aventura', 'xbox one', true, 18, 150000, true));
inventarioVideojuegos.push(new Videojuegos(11, 'celeste', 2018, 'plataformas', 'pc', false, 6, 50000, true));
inventarioVideojuegos.push(new Videojuegos(12, 'resident evil 4 remake', 2023, 'survival horror', 'ps5', false, 13, 250000, true));
inventarioVideojuegos.push(new Videojuegos(13, 'elden ring', 2022, 'rpg', 'pc', true, 0, 230000, true));
inventarioVideojuegos.push(new Videojuegos(14, 'forza horizon 5', 2021, 'carreras', 'xbox series x', true, 17, 240000, true));
inventarioVideojuegos.push(new Videojuegos(15, 'stardew valley', 2016, 'simulación', 'pc', true, 8, 45000, true));

function devolverUsuario() {
    // Mostrar usuario
    const usuario = localStorage.getItem('usuario');
    lbUsername.innerHTML = usuario ? usuario : 'Invitado';
    contenido.innerHTML = `<h2>🎮 Bienvenido</h2><p>Selecciona una opción del menú.</p>`;
    return usuariosSistema.find((usuarioExistente) => usuarioExistente.usuario == usuario)
}

// 🔐 Protección
if (!usuarioLogueado.rol) {
    window.location.href = "login.html";
}

// 🎯 Generar menú dinámico
function cargarMenu() {
    const lista = opciones[usuarioLogueado.rol];
    if (!lista) return;
    lista.forEach(op => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-3";
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div style="font-size:30px">${op.icono}</div>
            <h5 class="menu-title">${op.titulo}</h5>
        `;
        card.addEventListener("click", () => {
            cargarVista(op.titulo);
        });
        col.appendChild(card);
        contenedor.appendChild(col);
    });
}

function cargarVista(vista) {
    switch (vista) {
        case "Vender Juego":
            vistaVenderJuego();
            break;
        case "Revisar Mis Ventas":
            vistaMisVentas();
            break;
        case "Alquilar Juego":
            vistaAlquilarJuego();
            break;
        case "Comprar Juego":
            vistaComprarJuego();
            break;
        case "Aprobar Juegos":
            vistaAprobacionJuegos();
            break;
        case "Añadir Inventario":
            vistaCrearJuego();
            break;
        case "Ver Inventario":
            vistaEstadisticas();
            break;
        default:
            contenido.innerHTML = `<h3>${vista}</h3>`;
    }
}

function vistaVenderJuego() {
    contenido.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="card p-4" style="width: 100%; max-width: 500px; background: rgba(20,20,20,0.7); border: 1px solid rgba(0,255,255,0.2); border-radius: 15px;">

                <h4 class="mb-3 text-center" style="color:#00ffff;">🎮 Vender videojuego</h4>
                    <div class="alert alert-warning text-dark fw-bold text-center alert-pulse" role="alert" style="font-size: 1.05rem;">
                        ⚠️ ¡Lea atentamente! <br>
                        Al vendernos un juego, el precio que ofrecemos será del <b>85%</b> del valor de mercado 
                        al momento de la revisión por nuestros vendedores.
                    </div>
                <form id="formVender">

                    <input type="text" id="nombreJuego" 
                        class="form-control mb-3" 
                        placeholder="Nombre del juego" required>

                    <div class="row">
                        <div class="col-md-6">
                            <input type="number" id="anioJuego" 
                                class="form-control mb-3" 
                                placeholder="Año" required>
                        </div>

                        <div class="col-md-6">
                            <input type="text" id="generoJuego" 
                                class="form-control mb-3" 
                                placeholder="Género" required>
                        </div>
                    </div>

                    <input type="text" id="plataformaJuego" 
                        class="form-control mb-3" 
                        placeholder="Plataforma" required>

                    <!-- ✅ CHECKBOX ONLINE -->
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="onlineJuego">
                        <label class="form-check-label" for="onlineJuego">
                            ¿Tiene modo online?
                        </label>
                    </div>

                    <button class="btn w-100" style="background:#00ffff; color:black;">
                        Enviar
                    </button>

                </form>

                <div id="msgVenta" class="mt-3 text-center"></div>

            </div>
        </div>
    `;
    document.getElementById("formVender").addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombreJuego").value;
        const anio = document.getElementById("anioJuego").value;
        const genero = document.getElementById("generoJuego").value;
        const plataforma = document.getElementById("plataformaJuego").value;
        const online = document.getElementById("onlineJuego").checked;
        compraVideoJuego(nombre, anio, genero, plataforma, online);
    });
}

function vistaMisVentas() {
    if (!usuarioLogueado.carritoPendiente || usuarioLogueado.carritoPendiente.length === 0) {
        contenido.innerHTML = `
            <div class="text-center">
                <h4 class="text-info">📦 Mis ventas</h4>
                <p>No tienes videojuegos pendientes</p>
            </div>
        `;
        return;
    }
    let filas = "";
    usuarioLogueado.carritoPendiente.forEach((juegoNombre, index) => {
        filas += `
            <tr>
                <td>🎮 ${juegoNombre}</td>
                <td><span class="badge bg-warning text-dark">Pendiente</span></td>
                <td>
                    <button class="btn btn-gamer btn-sm" onclick="revisarJuego(${index})">
                        Revisar
                    </button>
                </td>
            </tr>
        `;
    });
    contenido.innerHTML = `
        <h4 class="mb-3 text-info">📦 Mis ventas</h4>
        <div class="tabla-gamer">
            <table class="table table-dark mb-0">
                <thead>
                    <tr>
                        <th>Videojuego</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
            </table>
        </div>

        <div id="lbMensaje" class="mt-3"></div>
    `;
    window.revisarJuego = function (index) {
        const nombreJuego = usuarioLogueado.carritoPendiente[index];
        const videojuegoExistente = inventarioVideojuegos.find(v =>
            v.nombre === nombreJuego
        );
        const lbMensaje = document.getElementById("lbMensaje");
        if (!videojuegoExistente || !videojuegoExistente.ingresoSistema) {
            lbMensaje.innerHTML = `
                <div class="alert alert-warning text-center">
                    ⏳ El videojuego aún no ha sido aprobado
                </div>
            `;
            return;
        }
        const precio = Math.floor(videojuegoExistente.precio * 0.85)
            .toLocaleString("es-CO");
        mostrarConfirmacion(
            `💰 Por el videojuego te ofrecemos: <br><b>$${precio}</b> <br><br>¿Aceptas la venta?`,
            (aceptado) => {
                if (aceptado) {
                    lbMensaje.innerHTML = `
                        <div class="mensaje-exitoso success-anim">
                            ✅ Venta realizada con éxito
                        </div>
                    `;
                    inventarioVideojuegos[videojuegoExistente.id - 1].existencias++;
                    usuarioLogueado.carritoPendiente.splice(index, 1);

                } else {
                    lbMensaje.innerHTML = `
                        <div class="mensaje-fallido">
                            ❌ Venta cancelada
                        </div>
                    `;
                }
                lbMensaje.style.display = "block";
                desaparecerElemento(lbMensaje);
                // 🔄 recargar tabla
                setTimeout(() => {
                    vistaMisVentas(usuarioLogueado);
                }, 1000);
            }
        );
    };
}

function vistaAlquilarJuego() {
    vistaSistemaFiltros(true);
}

function vistaComprarJuego() {
    vistaSistemaFiltros(false);
}

// Función para aprobar juegos para su compra
function vistaAprobacionJuegos() {

    const juegosPendientes = inventarioVideojuegos.filter(j => !j.ingresoSistema);

    if (juegosPendientes.length === 0) {
        contenido.innerHTML = `
            <div class="text-center">
                <h4 class="text-info">🎮 Aprobación de juegos</h4>
                <p>No hay juegos pendientes</p>
            </div>
        `;
        return;
    }

    let filas = "";

    juegosPendientes.forEach((juego, index) => {
        filas += `
            <tr>
                <td>${capitalizarCadaPalabra(juego.nombre)}</td>
                <td>${juego.anio}</td>
                <td>${capitalizarCadaPalabra(juego.genero)}</td>
                <td>${capitalizarCadaPalabra(juego.plataforma)}</td>
                <td>${juego.cuentaOnline ? "🌐 Sí" : "❌ No"}</td>
                <td>
                    <button class="btn btn-gamer btn-sm" onclick="abrirModalAprobacion(${index})">
                        Revisar
                    </button>
                </td>
            </tr>
        `;
    });

    contenido.innerHTML = `
        <h4 class="text-info mb-3">🎮 Juegos pendientes de aprobación</h4>

        <div class="tabla-gamer">
            <table class="table table-dark mb-0">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Año</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Online</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
            </table>
        </div>

        <div id="lbMensaje" class="mt-3"></div>
    `;
    // 🔥 función global
    window.abrirModalAprobacion = function (index) {
        const juego = juegosPendientes[index];
        mostrarModalAprobacion(juego);
    };
}

function vistaCrearJuego() {

    const generos = [...new Set(inventarioVideojuegos.map(j => j.genero))];
    const plataformas = [...new Set(inventarioVideojuegos.map(j => j.plataforma))];

    contenido.innerHTML = `
        <h4 class="text-info mb-3 text-center">🎮 Crear nuevo videojuego</h4>

        <div class="card bg-dark text-white p-4 mx-auto form-container">
            
            <form id="formCrearJuego">

                <div class="row g-3">

                    <div class="col-md-6">
                        <label>Nombre</label>
                        <input type="text" id="nombreJuego" class="form-control" required>
                    </div>

                    <div class="col-md-3">
                        <label>Año</label>
                        <input type="number" id="anioJuego" class="form-control" required>
                    </div>

                    <div class="col-md-3">
                        <label>Existencias</label>
                        <input type="number" id="existenciasJuego" class="form-control" required>
                    </div>

                    <!-- GÉNERO -->
                    <div class="col-md-6">
                        <label>Género</label>
                        <select id="generoJuego" class="form-select">
                            <option value="">Seleccione...</option>
                            ${generos.map(g => `<option value="${g}">${capitalizarCadaPalabra(g)}</option>`).join("")}
                            <option value="otro">➕ Otro</option>
                        </select>
                        <input type="text" id="otroGenero" class="form-control mt-2 d-none" placeholder="Ingrese nuevo género">
                    </div>

                    <!-- PLATAFORMA -->
                    <div class="col-md-6">
                        <label>Plataforma</label>
                        <select id="plataformaJuego" class="form-select">
                            <option value="">Seleccione...</option>
                            ${plataformas.map(p => `<option value="${p}">${capitalizarCadaPalabra(p)}</option>`).join("")}
                            <option value="otro">➕ Otro</option>
                        </select>
                        <input type="text" id="otraPlataforma" class="form-control mt-2 d-none" placeholder="Ingrese nueva plataforma">
                    </div>

                    <!-- 💰 PRECIO -->
                    <div class="col-md-6">
                        <label>Precio</label>
                        <input type="text" id="precioJuego" class="form-control" placeholder="Ej: 50,000" required>
                    </div>

                    <div class="col-md-6 d-flex align-items-center mt-4">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="checkOnline">
                            <label class="form-check-label ms-2">Modo online</label>
                        </div>
                    </div>

                </div>

                <button type="submit" class="btn btn-info w-100 mt-4">
                    Crear videojuego
                </button>

            </form>

            <div id="lbMensaje" class="mt-3"></div>

        </div>
    `;

    const form = document.getElementById("formCrearJuego");
    const inputPrecio = document.getElementById("precioJuego");
    const selectGenero = document.getElementById("generoJuego");
    const inputGenero = document.getElementById("otroGenero");

    selectGenero.addEventListener("change", () => {
        inputGenero.classList.toggle("d-none", selectGenero.value !== "otro");
    });

    const selectPlataforma = document.getElementById("plataformaJuego");
    const inputPlataforma = document.getElementById("otraPlataforma");

    selectPlataforma.addEventListener("change", () => {
        inputPlataforma.classList.toggle("d-none", selectPlataforma.value !== "otro");
    });

    // 💰 FORMATO EN TIEMPO REAL
    inputPrecio.addEventListener("input", () => {
        let valor = inputPrecio.value.replace(/\D/g, "");
        valor = Number(valor).toLocaleString("es-CO");
        inputPrecio.value = valor;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombreJuego").value.trim();
        const anio = parseInt(document.getElementById("anioJuego").value);
        let genero = selectGenero.value;
        let plataforma = selectPlataforma.value;
        const precioTexto = inputPrecio.value.replace(/\./g, "").replace(/,/g, "");
        const precio = parseFloat(precioTexto);
        const existencias = parseInt(document.getElementById("existenciasJuego").value);
        const cuentaOnline = document.getElementById("checkOnline").checked;
        const anioActual = new Date().getFullYear();

        if (genero === "otro") {
            genero = inputGenero.value.trim().toLowerCase();
        }

        if (plataforma === "otro") {
            plataforma = inputPlataforma.value.trim().toLowerCase();
        }

        // 🔥 VALIDACIONES
        if (!nombre || nombre.length < 3) {
            mostrarMensaje("⚠️ Nombre inválido", "warning");
            return;
        }

        if (isNaN(anio) || anio < 1950 || anio > anioActual) {
            mostrarMensaje("⚠️ Año inválido", "warning");
            return;
        }

        if (!genero) {
            mostrarMensaje("⚠️ Seleccione un género", "warning");
            return;
        }

        if (!plataforma) {
            mostrarMensaje("⚠️ Seleccione una plataforma", "warning");
            return;
        }

        if (isNaN(precio) || precio <= 0) {
            mostrarMensaje("⚠️ Precio inválido", "warning");
            return;
        }

        if (isNaN(existencias) || existencias <= 0) {
            mostrarMensaje("⚠️ Existencias inválidas", "warning");
            return;
        }

        // 🎮 CREAR JUEGO
        inventarioVideojuegos.push(
            new Videojuegos(
                inventarioVideojuegos.length + 1,
                nombre.toLowerCase(),
                anio,
                genero,
                plataforma,
                cuentaOnline,
                existencias,
                precio,
                true
            )
        );

        mostrarMensaje("✅ Videojuego creado correctamente", "success");

        form.reset();
    });
}

function vistaSistemaFiltros(bandera) {

    contenido.innerHTML = `
        <h4 class="text-info mb-3">🎮 Buscar videojuegos</h4>

        <div class="card bg-dark text-white p-3 mb-3" style="border:1px solid rgba(0,255,255,0.3)">
            
            <div class="row g-3">

                <!-- Tipo filtro -->
                <div class="col-md-3">
                    <label>Filtro</label>
                    <select id="filtroTipo" class="form-select">
                        <option value="nombre">Nombre</option>
                        <option value="genero">Género</option>
                        <option value="online">Online</option>
                        <option value="plataforma">Plataforma</option>
                    </select>
                </div>

                <!-- Input dinámico -->
                <div class="col-md-5" id="contenedorFiltro">
                    <label>Buscar</label>
                    <input id="inputFiltro" type="text" class="form-control" placeholder="Ingrese nombre...">
                </div>

                <!-- Botón -->
                <div class="col-md-4 d-flex align-items-end">
                    <button id="btnBuscar" class="btn btn-info w-100">Buscar</button>
                </div>

            </div>
        </div>

        <div id="resultados"></div>
        <div id="lbMensaje" class="mt-3"></div>
    `;

    const filtroTipo = document.getElementById("filtroTipo");
    const contenedorFiltro = document.getElementById("contenedorFiltro");
    const btnBuscar = document.getElementById("btnBuscar");

    // 🎯 Cambiar input según filtro
    filtroTipo.addEventListener("change", () => {
        const tipo = filtroTipo.value;

        if (tipo === "nombre") {
            contenedorFiltro.innerHTML = `
                <label>Nombre</label>
                <input id="inputFiltro" type="text" class="form-control" placeholder="mínimo 3 caracteres">
            `;
        }

        if (tipo === "genero") {
            const generos = [...new Set(inventarioVideojuegos.map(v => v.genero))];

            contenedorFiltro.innerHTML = `
                <label>Género</label>
                <select id="inputFiltro" class="form-select">
                    ${generos.map(g => `<option value="${g}">${capitalizarCadaPalabra(g)}</option>`).join("")}
                </select>
            `;
        }

        if (tipo === "online") {
            contenedorFiltro.innerHTML = `
                <label>Modo online</label>
                <select id="inputFiltro" class="form-select">
                    <option value="true">Con online</option>
                    <option value="false">Sin online</option>
                </select>
            `;
        }

        if (tipo === "plataforma") {
            const plataformas = [...new Set(inventarioVideojuegos.map(v => v.plataforma))];

            contenedorFiltro.innerHTML = `
                <label>Plataforma</label>
                <select id="inputFiltro" class="form-select">
                    ${plataformas.map(p => `<option value="${p}">${capitalizarCadaPalabra(p)}</option>`).join("")}
                </select>
            `;
        }
    });

    // 🔍 Buscar
    btnBuscar.addEventListener("click", () => {
        const tipo = filtroTipo.value;
        const valor = document.getElementById("inputFiltro").value;
        const lbMensaje = document.getElementById("lbMensaje");
        let lista = [];
        if (tipo === "nombre") {
            if (!valor || valor.trim().length < 3) {
                lbMensaje.innerHTML = `
                <div class="alert alert-warning text-center">
                    ⚠️ Ingrese al menos 3 caracteres
                </div>
                `;
                desaparecerElemento(lbMensaje)

                return;
            }
            lista = filtarPorNombre(valor);
        }
        if (tipo === "genero") {
            lista = filtrarPorGenero(valor);
        }
        if (tipo === "online") {
            lista = filtrarPorOnline(valor === "true");
        }
        if (tipo === "plataforma") {
            lista = filtrarPorPlataforma(valor);
        }
        mostrarResultados(lista, bandera);
    });
}

function compraVideoJuego(nombre, anio, genero, plataforma, online) {
    const lbMensaje = document.querySelector("#msgVenta")
    videojuegoExistente = inventarioVideojuegos.find((videojuegoExistente) => videojuegoExistente.nombre == nombre.toLowerCase())
    if (videojuegoExistente != undefined) {
        const precio = Math.floor(videojuegoExistente.precio * 0.85).toLocaleString("es-CO");
        mostrarConfirmacion(
            `💰 Por el videojuego te ofrecemos: <br><b>$${precio}</b> <br><br>¿Aceptas la venta?`,
            (aceptado) => {
                if (aceptado) {
                    lbMensaje.innerHTML = `
                        <div class="mensaje-exitoso">
                            ✅ Gracias por su compra
                        </div>
                    `
                    inventarioVideojuegos[videojuegoExistente.id - 1].existencias++;
                    desaparecerElemento(lbMensaje);
                } else {
                    lbMensaje.innerHTML = `
                        <div class="mensaje-fallido">
                            ❌ Venta cancelada
                        </div>
                    `
                    desaparecerElemento(lbMensaje);
                }
            }
        );
    } else {
        inventarioVideojuegos.push(new Videojuegos((inventarioVideojuegos.length + 1), nombre.toLowerCase(), anio, genero.toLowerCase(), plataforma.toLowerCase(), online));
        usuariosSistema[usuarioLogueado.id - 1].carritoPendiente.push(nombre);
        lbMensaje.innerHTML = `
            <div class="mensaje-exitoso">
                ✅ El juego se a enviado a revisión
            </div>
        `
        desaparecerElemento(lbMensaje);
    }
}

function vistaEstadisticas() {

    const totalJuegos = inventarioVideojuegos.length;

    const totalStock = inventarioVideojuegos.reduce((acc, j) => acc + j.existencias, 0);

    const valorInventario = inventarioVideojuegos.reduce((acc, j) => acc + (j.precio * j.existencias), 0);

    const juegosOnline = inventarioVideojuegos.filter(j => j.cuentaOnline).length;

    const juegosOffline = totalJuegos - juegosOnline;

    // 🎮 agrupar por género
    const generos = {};

    inventarioVideojuegos.forEach(j => {
        if (!generos[j.genero]) {
            generos[j.genero] = [];
        }
        generos[j.genero].push(j);
    });

    let acordeon = "";
    let index = 0;

    for (let genero in generos) {

        let juegosHTML = "";

        generos[genero].forEach(j => {
            juegosHTML += `
                <li class="list-group-item">
                    🎮 ${capitalizarCadaPalabra(j.nombre)} 
                    <span class="badge bg-info text-dark ms-2">
                        Stock: ${j.existencias}
                    </span>
                </li>
            `;
        });

        acordeon += `
            <div class="accordion-item bg-dark border-secondary">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed bg-dark text-cyan" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#genero${index}">
                        ${capitalizarCadaPalabra(genero)} (${generos[genero].length})
                    </button>
                </h2>
                <div id="genero${index}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <ul class="list-group">
                            ${juegosHTML}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        index++;
    }

    contenido.innerHTML = `
        <h4 class="text-cyan text-center mb-4">📊 Estadísticas del inventario</h4>

        <div class="row g-4">

            <div class="col-md-4">
                <div class="card bg-dark text-center p-3">
                    <h6>Total juegos</h6>
                    <h3 class="text-cyan">${totalJuegos}</h3>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card bg-dark text-center p-3">
                    <h6>Total stock</h6>
                    <h3 class="text-cyan">${totalStock}</h3>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card bg-dark text-center p-3">
                    <h6>Valor inventario</h6>
                    <h3 class="text-cyan">$${valorInventario.toLocaleString("es-CO")}</h3>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card bg-dark text-center p-3">
                    <h6>🌐 Juegos con online</h6>
                    <h4 class="text-success">${juegosOnline}</h4>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card bg-dark text-center p-3">
                    <h6>🎮 Juegos sin online</h6>
                    <h4 class="text-danger">${juegosOffline}</h4>
                </div>
            </div>

            <!-- 🎯 ACORDEÓN -->
            <div class="col-md-12">
                <div class="accordion" id="accordionGeneros">
                    ${acordeon}
                </div>
            </div>

        </div>
    `;
}


function desaparecerElemento(elemento) {
    setTimeout(() => {
        elemento.style.transition = "opacity 0.5s";
        elemento.style.opacity = "0";
        setTimeout(() => {
            elemento.innerHTML = "";
            elemento.style.opacity = "1";
        }, 500);
    }, 5000);
}

function mostrarConfirmacion(mensaje, callback) {
    const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));

    document.getElementById('textoModal').innerHTML = mensaje;

    const btnAceptar = document.getElementById('btnAceptar');
    const btnCancelar = document.getElementById('btnCancelar');

    // Limpiar eventos anteriores
    btnAceptar.onclick = null;
    btnCancelar.onclick = null;

    btnAceptar.onclick = () => {
        document.activeElement.blur();
        modal.hide();
        callback(true);
    };

    btnCancelar.onclick = () => {
        document.activeElement.blur();
        modal.hide();
        callback(false);
    };

    modal.show();
}

function mostrarResultados(lista, bandera) {

    const resultados = document.getElementById("resultados");

    if (lista.length === 0) {
        resultados.innerHTML = `<p class="text-center">No se encontraron resultados</p>`;
        return;
    }

    let filas = "";

    lista.forEach((juego, index) => {
        const precio = Math.floor(juego.precio * (bandera ? 0.05 : 1))
            .toLocaleString("es-CO");

        filas += `
            <tr>
                <td>🎮 ${capitalizarCadaPalabra(juego.nombre)}</td>
                <td>${capitalizarCadaPalabra(juego.genero)}</td>
                <td>${capitalizarCadaPalabra(juego.plataforma)}</td>
                <td>${juego.cuentaOnline ? "🌐 Sí" : "❌ No"}</td>
                <td>$${precio} ${bandera ? "/día" : ""}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="seleccionarJuego(${index})">
                        Seleccionar
                    </button>
                </td>
            </tr>
        `;
    });

    resultados.innerHTML = `
        <div class="tabla-gamer">
            <table class="table table-dark mb-0">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Online</th>
                        <th>Precio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
        </div>
    `;

    // 🎮 Seleccionar juego
    window.seleccionarJuego = function (index) {
        const juego = lista[index];

        if (juego.existencias <= 0) {
            mostrarMensaje("❌ No disponible", "error");
            return;
        }

        if (bandera) {
            formalizarAlquiler(juego);
        } else {
            formalizarVenta(juego);
        }
    };
}

function formalizarAlquiler(videojuegoElegido) {
    if (!videojuegoElegido || videojuegoElegido.existencias <= 0) {
        mostrarMensaje("❌ Juego no disponible", "error");
        return;
    }
    const modalElement = document.getElementById('modalAlquiler');
    const modal = new bootstrap.Modal(modalElement);
    const nombreJuego = document.getElementById("nombreJuego");
    const inputDias = document.getElementById("inputDias");
    const precioCalculado = document.getElementById("precioCalculado");
    const btnConfirmar = document.getElementById("btnConfirmarAlquiler");
    const btnCancelar = document.getElementById("btnCancelarAlquiler");
    nombreJuego.innerHTML = `🎮 ${capitalizarCadaPalabra(videojuegoElegido.nombre)}`;
    inputDias.value = "";
    precioCalculado.innerHTML = "";
    // 🔄 Calcular precio dinámicamente
    inputDias.oninput = () => {
        const dias = parseInt(inputDias.value);
        if (!isNaN(dias) && dias > 0) {
            const total = Math.floor(dias * (videojuegoElegido.precio * 0.05))
                .toLocaleString("es-CO");
            precioCalculado.innerHTML = `💰 Total: $${total}`;
        } else {
            precioCalculado.innerHTML = "";
        }
    };
    // ❌ Cancelar
    btnCancelar.onclick = () => {
        document.activeElement.blur();
        modal.hide();
        mostrarMensaje("❌ Alquiler cancelado", "error");
    };
    // ✅ Confirmar
    btnConfirmar.onclick = () => {
        const dias = parseInt(inputDias.value);
        if (isNaN(dias) || dias <= 0) {
            mostrarMensaje("⚠️ Ingrese un número válido de días", "warning");
            return;
        }
        const total = Math.floor(dias * (videojuegoElegido.precio * 0.05))
            .toLocaleString("es-CO");
        document.activeElement.blur();
        modal.hide();
        // 🎉 mensaje éxito
        mostrarMensaje(`✅ Reserva realizada por $${total}`, "success");
        // actualizar inventario
        inventarioVideojuegos[videojuegoElegido.id - 1].existencias--;
    };
    modal.show();
}

function formalizarVenta(videojuegoElegido) {
    if (!videojuegoElegido || videojuegoElegido.existencias <= 0) {
        mostrarMensaje("❌ Juego no disponible", "error");
        return;
    }
    const precio = Math.floor(videojuegoElegido.precio)
        .toLocaleString("es-CO");
    mostrarConfirmacion(
        `💰 El precio del videojuego es: <br><b>$${precio}</b> <br><br>¿Deseas comprarlo?`,
        (aceptado) => {
            if (aceptado) {
                // 🎮 mensaje éxito
                mostrarMensaje("✅ Gracias por su compra", "success");
                // actualizar inventario
                inventarioVideojuegos[videojuegoElegido.id - 1].existencias--;
            } else {
                // ❌ cancelación
                mostrarMensaje("❌ Venta cancelada", "error");
            }
        }
    );
}

function mostrarModalAprobacion(juego) {
    const modalElement = document.getElementById('modalAprobacion');
    const modal = new bootstrap.Modal(modalElement);
    const infoJuego = document.getElementById("infoJuego");
    const inputPrecio = document.getElementById("inputPrecio");
    const btnGuardar = document.getElementById("btnGuardarAprobacion");
    const btnCancelar = document.getElementById("btnCancelarAprobacion");

    // 🎮 info del juego
    infoJuego.innerHTML = `
        <b>Juego:</b> ${capitalizarCadaPalabra(juego.nombre)} <br>
        <b>Año:</b> ${juego.anio} <br>
        <b>Género:</b> ${capitalizarCadaPalabra(juego.genero)} <br>
        <b>Plataforma:</b> ${capitalizarCadaPalabra(juego.plataforma)} <br>
        <b>Online:</b> ${juego.cuentaOnline ? "Sí" : "No"}
    `;
    inputPrecio.value = "";

    // ❌ cancelar
    btnCancelar.onclick = () => {
        document.activeElement.blur();
        modal.hide();
        mostrarMensaje("❌ Operación cancelada", "error");
    };

    // ✅ guardar
    btnGuardar.onclick = () => {
        const precio = parseFloat(inputPrecio.value);
        if (isNaN(precio) || precio <= 0) {
            mostrarMensaje("⚠️ Ingrese un precio válido", "warning");
            return;
        }
        document.activeElement.blur();
        modal.hide();
        // actualizar juego
        inventarioVideojuegos[juego.id - 1].precio = precio;
        inventarioVideojuegos[juego.id - 1].ingresoSistema = true;
        mostrarMensaje("✅ Juego aprobado correctamente", "success");

        // 🔄 refrescar vista
        setTimeout(() => {
            vistaAprobacionJuegos();
        }, 2000);
    };
    modal.show();
}

function mostrarMensaje(texto, tipo) {
    const lbMensaje = document.getElementById("lbMensaje");
    let color = "#00ffff";
    if (tipo === "error") color = "#ff4d4d";
    if (tipo === "warning") color = "#ffc107";
    lbMensaje.innerHTML = `
        <div style="
            background: rgba(0,0,0,0.7);
            color: ${color};
            border: 1px solid ${color};
            border-radius: 10px;
            padding: 10px;
            text-align: center;
        ">
            ${texto}
        </div>
    `;
    desaparecerElemento(lbMensaje);
}

//Función que permite filtrar por nombre de videojuego
function filtarPorNombre(juego) {
    return juegosPorNombre = inventarioVideojuegos.filter((juegos) => juegos.nombre.includes(juego.toLowerCase()))
}

//Función que permite filtrar por generos de videojuegos
function filtrarPorGenero(genero) {
    return juegosPorGenero = inventarioVideojuegos.filter((juegos) => juegos.genero == genero)
}

// Función que permite filtrar por preferencia de la función online
function filtrarPorOnline(gustoOnline) {
    return juegosPorFuncionOnline = inventarioVideojuegos.filter((juegos) => juegos.cuentaOnline == gustoOnline);
}

// Función que permite filtrar por plataforma de videojuegos
function filtrarPorPlataforma(plataforma) {
    return juegosPorPlataforma = inventarioVideojuegos.filter((juegos) => juegos.plataforma == plataforma)
}

//Funcion para Capitalizar las palabras
function capitalizarCadaPalabra(texto) {
    return texto
        .split(" ")
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");
}

cargarMenu();