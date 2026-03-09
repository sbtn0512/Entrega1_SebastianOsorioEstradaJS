// Creación de constructores

// Constructor Usuarios

function Usuario(id, usuario, clave, rol, carritoPendiente = []) {
    this.id = id;
    this.usuario = usuario;
    this.clave = clave;
    this.rol = rol;
    this.carritoPendiente = carritoPendiente;
}

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

// Creación de objetos

const usuariosSistema = [];
const inventarioVideojuegos = []


// Llenado por defecto de objetos (Inicial)

// Usuarios habilitados en el sistema
usuariosSistema.push(new Usuario(1, 'cliente', '1234', 'cliente'))
usuariosSistema.push(new Usuario(1, 'cliente2', '1234', 'cliente', ['sekiro: shadows die twice', 'minecraft', 'grand theft auto v']))
usuariosSistema.push(new Usuario(2, 'vendedor', '4321', 'vendedor'))
usuariosSistema.push(new Usuario(3, 'admin', '3412', 'admin'))

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

// Inicio del programa

// Login

function login() {
    for (let i = 2; i >= 0; i--) {
        const usuario = prompt('Ingresa tu usuario: ');

        const clave = prompt('Ingresa tu clave: ');
        if (usuariosSistema.find(usuarioSistema => usuarioSistema.usuario == usuario.toLowerCase() && usuarioSistema.clave == clave) !== undefined) {
            localStorage.removeItem('usuario')
            localStorage.setItem('usuario', usuario)
            return true;
        } else {
            console.log('Usuario o clave incorrecto intente nuevamente');

        }
    }
    return false;
}

// Función que controla el menú

function menu(usuario) {
    if (usuario.rol == 'cliente') {
        menuCliente();
    } else if (usuario.rol == 'vendedor') {
        menuVendedor();
    } else if (usuario.rol == 'admin') {
        menuAdmin();
    }
}

// Función encargada de las funciones disponibles para el rol de cliente
function menuCliente() {
    let opcion, videJuego;
    do {
        opcion = prompt('Eliga una opción: \n 1. Desea vendernos un juego. \n 2. Revisar estado de mis ventas \n 3. Desea alquilar un juego. \n 4. Desea comprar un juego. \n 5. Cerrar sesión.')
        switch (opcion) {
            case '1':
                compraVideojuegos(usuario);
                break;
            case '2':
                revisarVentaVideojuegos(usuario);
                break;
            case '3':
                videJuego = sistemaFiltros();
                formalizarAlquiler(videJuego);
                break;
            case '4':
                videJuego = sistemaFiltros();
                formalizarVenta(videJuego);
                break;
            case '5':
                console.log(`Vuelva pronto ${usuario.usuario}`);
                return;
            default:
                console.log('Opción incorrecta, Ingrese una opción valida');
        }
    } while (true);
}

// Función encargada de las funciones disponibles para el rol Vendedor
function menuVendedor() {
    let opcion;
    do {
        opcion = prompt('Eliga una opción: \n 1. Aprobar juegos. \n 2. Añadir juegos al inventario. \n 3. Cerrar sesión.')
        switch (opcion) {
            case '1':
                revisionJuegos();
                break;
            case '2':
                crearJuegos();
                break;
            case '3':
                console.log(`Vuelva pronto ${usuario.usuario}`);
                return;
            default:
                console.log('Opción incorrecta, Ingrese una opción valida');
        }
    } while (true);
}

// Función encargada de las funciones disponibles para el rol administrador
function menuAdmin() {
    opcion = prompt('Eliga una opción: \n 1. Aprobar juegos. \n 2. Añadir juegos al inventario. \n 3. Registrar usuarios. \n 4. Cerrar sesión.')
}

// Función encargada de compra de videojuegos
function compraVideojuegos(usuario) {
    let anioActual = new Date().getFullYear();
    confirma = confirm('¡Lea atentamente!\n Al vendernos un juego el precio que nosotros le ofrecemos sera del 85% que se encuentre en el mercado en el momento de revisión por nuestros vendedores')
    if (confirma) {
        nombre = prompt('Ingrese el nombre completo del juego(Sin abreviaciones, como aparece en la caratula): ');
        videojuegoExistente = inventarioVideojuegos.find((videojuegoExistente) => videojuegoExistente.nombre == nombre.toLowerCase())
        if (videojuegoExistente != undefined) {
            console.log(videojuegoExistente.precio);

            confirmaPrecio = confirm('Por el videJuego te ofrecemos: $' + Math.floor(videojuegoExistente.precio * 0.85).toLocaleString("es-CO"))
            if (confirmaPrecio) {
                console.log('Gracias por su venta, regrese pronto');
                inventarioVideojuegos[videojuegoExistente.id - 1].existencias++;
            }
            else {
                console.log('Venta cancelada');
            }
        } else {
            do {
                anio = parseInt(prompt('De que año es el juego: '));
                if ((isNaN(anio) || anio < 1950 || anio > anioActual)) {
                    console.log('El año es incorrecto, ingrese un valor valido');
                }
            } while (isNaN(anio) || anio < 1950 || anio > anioActual);
            genero = prompt('De que genero es el juego?: ');
            plataforma = prompt('De que plataforma es el juego: ');
            cuentaOnline = confirm('Cuenta con online el juego (Presione Aceptar para si, Cancelar para No)')
            inventarioVideojuegos.push(new Videojuegos((inventarioVideojuegos.length + 1), nombre.toLowerCase(), anio, genero.toLowerCase(), plataforma.toLowerCase(), cuentaOnline));
            usuariosSistema[usuario.id - 1].carritoPendiente.push(nombre);
            console.log('Uno de nuestros empleados esta revisando la propuesta, Ingrese más tarde para revisar el precio que podemos ofrecerte');
        }
    } else {
        console.log('Venta cancelada');
    }
}

// Funcion encargada de revisar la venta de los videojuegos
function revisarVentaVideojuegos(usuario) {
    if (usuario.carritoPendiente.length == 0) {
        console.log('No hay videojuegos pendientes de revisar');
    } else {
        let texto = 'Elige el video Juego que quieres revisar: \n';
        for (let i = 0; i < usuario.carritoPendiente.length; i++) {
            texto = texto + `${i + 1}. ${capitalizarCadaPalabra(usuario.carritoPendiente[i])} \n`;
        }
        do {
            opcionRevisar = parseInt(prompt(texto));
            if ((isNaN(opcionRevisar) || opcionRevisar < 1 || opcionRevisar > usuario.carritoPendiente.length)) {
                console.log('Opción invalida, ingrese una opción valida');
            }
        } while (isNaN(opcionRevisar) || opcionRevisar < 1 || opcionRevisar > usuario.carritoPendiente.length);
        videojuegoExistente = inventarioVideojuegos.find((videojuegoExistente) => videojuegoExistente.nombre == usuario.carritoPendiente[opcionRevisar - 1])


        if (videojuegoExistente.ingresoSistema) {
            confirmaPrecio = confirm('Por el videJuego te ofrecemos: $' + Math.floor(videojuegoExistente.precio * 0.85).toLocaleString("es-CO"))
            if (confirmaPrecio) {
                console.log('Gracias por su venta, regrese pronto');
                inventarioVideojuegos[videojuegoExistente.id - 1].existencias++;
            }
            else {
                usuariosSistema[usuario.id - 1].carritoPendiente = usuario.carritoPendiente.filter(n => n !== videojuegoExistente.nombre);
                console.log('Venta cancelada');
            }
        } else {
            console.log('El Videojuego seleccionado aún no se a ingresado en el sistema');
        }
    }
}

// Función encargada de seleccionar el videojuego de interes
function sistemaFiltros(bandera) {
    let opcion, texto, listaVideoJuegos, videoJuego;
    do {
        opcion = prompt('Buscar o filtrar videojuego: \n 1. Por nombre \n 2. Por genero \n 3. Preferencia por contenido online \n 4. Por plataforma')
        if ((isNaN(opcion) || opcion < 1 || opcion > 4)) {
            console.log('Opción invalida, ingrese una opción valida');
        }
    } while (isNaN(opcion) || opcion < 1 || opcion > 4);
    switch (opcion) {
        case '1':
            let juego
            do {
                juego = prompt("Ingrese el nombre del juego (mínimo 3 caracteres):");
            } while (!juego || juego.trim().length < 3);
            listaVideoJuegos = filtarPorNombre(juego);
            break;
        case '2':
            texto = 'Elige el genero que quieres revisar: \n';
            const generos = [...new Set(inventarioVideojuegos.map(v => v.genero))];
            for (let i = 0; i < generos.length; i++) {
                texto = texto + `${i + 1}. ${capitalizarCadaPalabra(generos[i])} \n`;
            }
            do {
                generoSeleccionado = parseInt(prompt(texto));
                if ((isNaN(generoSeleccionado) || generoSeleccionado < 1 || generoSeleccionado > generos.length)) {
                    console.log('Opción invalida, ingrese una opción valida');
                }
            } while (isNaN(generoSeleccionado) || generoSeleccionado < 1 || generoSeleccionado > generos.length);
            listaVideoJuegos = filtrarPorGenero(generos[generoSeleccionado - 1]);
            break;
        case '3':
            const gustoOnline = confirm('Desea listar los juegos que tengan función online (Aceptar Si, Cancelar No)')
            listaVideoJuegos = filtarPorOnline(gustoOnline);
            break;
        case '4':
            texto = 'Elige la plataforma que quieres revisar: \n';
            const plataformas = [...new Set(inventarioVideojuegos.map(v => v.plataforma))];
            for (let i = 0; i < plataformas.length; i++) {
                texto = texto + `${i + 1}. ${capitalizarCadaPalabra(plataformas[i])} \n`;
            }
            do {
                plataformaSeleccionada = parseInt(prompt(texto));
                if ((isNaN(plataformaSeleccionada) || plataformaSeleccionada < 1 || plataformaSeleccionada > plataformas.length)) {
                    console.log('Opción invalida, ingrese una opción valida');
                }
            } while (isNaN(plataformaSeleccionada) || plataformaSeleccionada < 1 || plataformaSeleccionada > plataformas.length);
            listaVideoJuegos = filtrarPorPlataforma(plataformas[plataformaSeleccionada - 1]);
            break;
    }
    texto = 'Elige el video Juego de interes: \n';
    for (let i = 0; i < listaVideoJuegos.length; i++) {
        texto += `${i + 1}. ${capitalizarCadaPalabra(listaVideoJuegos[i].nombre)}: Precio $${Math.floor(listaVideoJuegos[i].precio * (bandera ? 0.05 : 1)).toLocaleString("es-CO")}${bandera ? " por día" : ""}\n`;
    }
    do {
        opcion = parseInt(prompt(texto));
        if ((isNaN(opcion) || opcion < 1 || opcion > listaVideoJuegos.length)) {
            console.log('Opción invalida, ingrese una opción valida');
        }
    } while (isNaN(opcion) || opcion < 1 || opcion > listaVideoJuegos.length);
    videoJuego = listaVideoJuegos.find((videojuegoExistente) => videojuegoExistente.nombre == listaVideoJuegos[opcionAlquilar - 1].nombre && videojuegoExistente.existencias > 0);
    return videoJuego;
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
function filtrarPorGenero(plataforma) {
    return juegosPorPlataforma = inventarioVideojuegos.filter((juegos) => juegos.plataforma == plataforma)
}

//Función que formaliza el alquiler del juego
function formalizarAlquiler(videojuegoElegido) {
    if (videojuegoElegido != undefined) {
        let diasAlquiler
        do {
            diasAlquiler = prompt("Cuantos días desea realizar el alquiler del juego: ");
        } while ((isNaN(diasAlquiler) || opcionAlquilar < 1));
        if (confirm(`El precio total por la reserva es: $${Math.floor(diasAlquiler * (videojuegoElegido.precio * 0.05)).toLocaleString("es-CO")} \n Acepta el alquiler?`)) {
            console.log('Gracias por la reserva, vuelva pronto');
            inventarioVideojuegos[videojuegoElegido.id - 1].existencias--;
        } else {
            console.log('Alquiler cancelado');
        }
    } else {
        console.log('Lo sentimos el juego no se encuentra disponible actualmente');
    }
}

//Función que formaliza la venta del juego
function formalizarVenta(videojuegoElegido) {
    if (videojuegoElegido != undefined) {
        if (confirm(`El precio total por el video juego es: $${Math.floor(videojuegoElegido.precio).toLocaleString("es-CO")} \n Acepta la compra?`)) {
            console.log('Gracias por la compra, vuelva pronto');
            inventarioVideojuegos[videojuegoElegido.id - 1].existencias--;
        } else {
            console.log('Venta cancelada');
        }
    } else {
        console.log('Lo sentimos el juego no se encuentra disponible actualmente');
    }
}

// Función para aprobar juegos para su compra
function revisionJuegos() {
    const juegosPendientesAprobacion = inventarioVideojuegos.filter((juegos) => (!juegos.ingresoSistema))
    if (juegosPendientesAprobacion.length > 0) {
        texto = 'Elige juego a revisar: \n';
        for (let i = 0; i < juegosPendientesAprobacion.length; i++) {
            texto = texto + `${i + 1}. ${capitalizarCadaPalabra(juegosPendientesAprobacion[i].nombre)} \n`;
        }
        do {
            juegoSeleccionado = parseInt(prompt(texto));
            if ((isNaN(juegoSeleccionado) || juegoSeleccionado < 1 || juegoSeleccionado > juegosPendientesAprobacion.length)) {
                console.log('Opción invalida, ingrese una opción valida');
            }
        } while (isNaN(juegoSeleccionado) || juegoSeleccionado < 1 || juegoSeleccionado > juegosPendientesAprobacion.length);
        const juegoEncontrado = inventarioVideojuegos.find((juego) => juego.id == juegoSeleccionado);
        do {
            precio = prompt(`----------LEA ATENTAMENTE----------\n Para ingresar finalmente el juego al inventario ingrese el precio en caso contrario presione cancelar \n ---------------------------------------- \n  Juego: ${capitalizarCadaPalabra(juegoEncontrado.nombre)} \n Año: ${juegoEncontrado.anio} \n Genero: ${capitalizarCadaPalabra(juegoEncontrado.genero)} \n Plataforma: ${capitalizarCadaPalabra(juegoEncontrado.plataforma)} \n Cuenta con Online: ${juegoEncontrado.cuentaOnline ? 'Si' : 'No'} \n Precio: `)
            if (precio === null) {
                console.log("Operación cancelada");
                break;
            } else {
                if (isNaN(precio) || precio <= 0) {
                    console.log('Ingrese un valor valido o presiona cancelar');
                }
            }
        } while (isNaN(precio) || precio <= 0);
        if (precio === null) {
            console.log('Se regresará al menu principal, no se actualiza el juego');
        } else {
            inventarioVideojuegos[juegoEncontrado.id - 1].precio = parent(precio);
            inventarioVideojuegos[juegoEncontrado.id - 1].ingresoSistema = true;
            console.log('El juego se a actualizado correctamente');
        }
    } else {
        console.log('En el momento no se encuentran juegos pendientes');
    }
}

// Función para crear juegos en el inventario
function crearJuegos() {
    const nombre = prompt('Ingrese el nombre completo del juego del juego');
    const anio = prompt('Ingrese el año de lanzamiento del juego');
    const genero = prompt('Ingrese el genero del juego');
    const plataforma = prompt('Ingrese la plataforma en donde esta el juego');
    const precio = prompt('Ingrese el precio del juego');
    const cuentaOnline = confirm('Cuenta con funciones online (Presione Aceptar para Si, cancelar No)');
    const existencias = prompt('Cuantas existencias del juego se registrarán');
    inventarioVideojuegos.push(new Videojuegos((inventarioVideojuegos.length + 1), nombre, anio, genero, plataforma, cuentaOnline, existencias, precio, true))
}

//Funcion para Capitalizar las palabras
function capitalizarCadaPalabra(texto) {
    return texto
        .split(" ")
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");
}

// Función principal
function main() {
    do {
        if (!login()) {
            console.log('Usuario bloqueado por seguridad, reinicie el sistema para volver a ingresar');
            return;
        } else {
            const usuario = localStorage.getItem('usuario');
            console.log(`Bienvenido al sistema ${usuario}`);
            const datosUsuario = usuariosSistema.find((usuarioExistente) => usuarioExistente.usuario == usuario)
            console.table(inventarioVideojuegos)
            menu(datosUsuario);
            console.log('\n\n\n\n\n ------------------------------------------------------------------------------------------\n\n\n\n\n');

        }
    } while (confirm('¿Deseas realizar otra operación?'));
}
console.log('prueba');

main();
console.log('Gracias por usar el sistema');