/* Primera entrega - Flujo de compras */
/* 
1 Para entrar a la tienda hay que ingresar contraseña 2025
2 Bienvenida a la tienda
3 Catálogo de productos con la opción de irse sin comprar
4 Ingresar cantidad del producto elegido
5 Mostrar detalle del producto con la cantidad y el total hasta el momento
6 Preguntar si quiere seguir comprando o pasar a ver el detalle
6.1 Si decide seguir comprando, vuelve al paso 3 -> 4 -> 5 -> 6
6.2 Si decide ver el detalle de compra pasa el 7
7 Detalle de compra
8 Despedida
*/

/* const contrasena = "2025";

let contrasenaIngresada = prompt("Para entrar a nuestra tienda debes ingresar la contraseña 🧐");

while (contrasenaIngresada != contrasena) {
  console.log("Contraseña invalida");
  contrasenaIngresada = prompt("Contraseña incorrecta ⛔\nIntenta nuevamente 👀");
}
console.log("Ingresaste correctamente");

let bienvenida =
  "Bienvenido(a) a nuestra tienda 🛒 😃\nEsperamos que nuestros productos sean de tu agrado 💻";
alert(bienvenida);
console.log("Inicio de tienda: " + bienvenida);

const catalogoProductos = [
  {
    producto: 1,
    nombre: "Monitor 24' - Xiaomi",
    precio: 120000,
  },
  {
    producto: 2,
    nombre: "Teclado Gamer - Logitech",
    precio: 110000,
  },
  {
    producto: 3,
    nombre: "Mouse vertical ergonómico - Logitech",
    precio: 70000,
  },
  {
    producto: 4,
    nombre: "Mouse Pad Gamer 120cm - HP",
    precio: 25000,
  },
];
console.log(catalogoProductos);


let carritoCompra = prompt(
  "Aquí encontrarás lo que necesitas para trabajar desde casa 💻🛠️\n\n1 - Monitor 24' Xiaomi - $120000\n2 - Teclado Gamer Logitech - $110000\n3 - Mouse vertical ergonómico Logitech - $70000\n4 - Mouse Pad Gamer 120cm HP $25000\n5 - Prefiero comprar en otro momento"
);
console.log("Elegiste la opción: " + carritoCompra);

function ingresarCantidad(){
    let cantidadIngresada = parseInt(prompt("¿Cuantas unidades quieres comprar? 😏"));
    console.log("Ingresaste: " + cantidadIngresada);
    return cantidadIngresada;
}

function calcularTotal(precio, cantidad){
    let totalCalculado = precio * cantidad;
    console.log(totalCalculado);
    return precio * cantidad;
}

function mostrarResumenCompra(nombre, cantidad, total){
    alert(
        "Seleccionaste: " + cantidad + " unidades de " + nombre + "\n\nEl total de tu compra es: $" + total
    );
}

let totalCompra = 0;
let totalProducto = 0;

while (carritoCompra !== "5") {
  if (
    carritoCompra === "1" ||
    carritoCompra === "2" ||
    carritoCompra === "3" ||
    carritoCompra === "4"
  ) {

    switch (carritoCompra) {
      case "1":
        let cantidad = ingresarCantidad();
        let total = calcularTotal(catalogoProductos[0].precio, cantidad);
        mostrarResumenCompra(catalogoProductos[0].nombre, cantidad, total);
        totalCompra += total;
        totalProducto += cantidad;
        break;
      case "2":
        let cantidad1 = ingresarCantidad();
        let total1 = calcularTotal(catalogoProductos[1].precio, cantidad1);
        mostrarResumenCompra(catalogoProductos[1].nombre, cantidad1, total1);
        totalCompra += total1;
        totalProducto += cantidad1;
        break;
      case "3":
        let cantidad2 = ingresarCantidad();
        let total2 = calcularTotal(catalogoProductos[2].precio, cantidad2);
        mostrarResumenCompra(catalogoProductos[2].nombre, cantidad2, total2);
        totalCompra += total2;
        totalProducto += cantidad2;
        break;
      case "4":
        let cantidad3 = ingresarCantidad();
        let total3 = calcularTotal(catalogoProductos[3].precio, cantidad3);
        mostrarResumenCompra(catalogoProductos[3].nombre, cantidad3, total3);
        totalCompra += total3;
        totalProducto += cantidad3;
        break;
    }
  } else {
    alert("La opción ingresada no es valida ⚠️ ☠️\n\nTe invitamos a elegir nuevamente una opción 😊");
  }

  carritoCompra = prompt(
    "¿Deseas seguir comprando? 🛒😏\n\n1 - Monitor 24' Xiaomi - $120000\n2 - Teclado Gamer Logitech - $110000\n3 - Mouse vertical ergonómico Logitech - $70000\n4 - Mouse Pad Gamer 120cm HP $25000\n5 - No, quiero ver el detalle de mi compra 😮‍💨"
  ); 
  console.log("Elegiste la opción: " + carritoCompra);
}

if (totalCompra > 0) {
    alert("Gracias por confiar en nuestra tienda 🤩\n\nAquí está el detalle de tu compra 🛒\n\nCantidad de productos: " + totalProducto + "\nTotal $" + totalCompra);
    console.log("Total de productos: " + totalProducto + " y el Total de importe es: $" + totalCompra);
}else {
    alert("¡Gracias por visitarnos! 👋🏻");
    console.log("¡Gracias por visitarnos!");
}

function despedida() {
    alert("¡Nos vemos pronto! 👋🏻");
  }
console.log("¡Nos vemos pronto!");
despedida(); */

//
const nombreInput = document.getElementById("nombreInput");
const entrarTienda = document.getElementById("entrarTienda");
const mensajePersonalizado = document.getElementById("mensajePersonalizado");
const contenido = document.getElementById("contenido");
const grillaProductos = document.getElementById("productos");

const catalogoProductos = [
  {
    producto: 1,
    nombre: "Monitor 24 pulgadas - Xiaomi",
    precio: 120000,
    imagen: "img/monitor.avif"
  },
  {
    producto: 2,
    nombre: "Teclado Gamer - Logitech",
    precio: 110000,
    imagen: "img/teclado.jpg"
  },
  {
    producto: 3,
    nombre: "Mouse vertical ergonómico - Logitech",
    precio: 70000,
    imagen: "img/mouse.webp"
  },
  {
    producto: 4,
    nombre: "Mouse Pad Gamer 120cm - HP",
    precio: 25000,
    imagen: "img/mouse-pad.webp"
  },
];

let carrito = {};

const usuarioGuardado = localStorage.getItem("nombreDeUsuario");
if (usuarioGuardado) {
  nombreInput.value = usuarioGuardado;
  mensajePersonalizado.innerText = `¡${usuarioGuardado}, bienvenid@ nuevamente a nuestra tienda!✌🏼`
} else {
  mensajePersonalizado.innerText = `¡Bienvenid@ a nuestra tienda!✌🏼`
}

const carritoGuardado = JSON.parse(localStorage.getItem("carritoDeCompra"));
if (carritoGuardado){
  carrito = carritoGuardado;
  actualizarCarrito();
}

entrarTienda.onclick = () => {
  const nombreIngresado = nombreInput.value;
  if (nombreIngresado){
    nombreInput.value = nombreIngresado;
    mensajePersonalizado.innerText = `¡${nombreIngresado}, hoy es un buen día para comprar! 😎`;
  localStorage.setItem("nombreDeUsuario", nombreIngresado);
  }else {
    mensajePersonalizado.innerText = `¡Hoy es un buen día para comprar! 😎`
  }
  
  if (!document.getElementById("mostrarCatalogo")) {
    contenido.innerHTML += `<p>Aquí encontrarás lo que estás buscando para trabajar desde casa 😁</p><button id="mostrarCatalogo">Revisa nuestro catálogo</button>`;

    const mostrarCatalogo = document.getElementById("mostrarCatalogo");
    mostrarCatalogo.onclick = () => {
      renderizarProductos();
      if (!document.getElementById("esconderCatalogo")) {
        productos.innerHTML += `<div class="container">
    <button id="esconderCatalogo">Esconder catálogo</button>
</div>`;
      }
      const esconderCatalogo = document.getElementById("esconderCatalogo");
      esconderCatalogo.onclick = () => {
        productos.innerHTML = "";
      };
    };
  }
};



function renderizarProductos() {
  grillaProductos.innerHTML = `<div class="container d-flex justify-content-between d-grid gap-3 btn-ascc-desc">
    <button onclick="ordenarPorPrecioAsc()">Precios de menor a mayor</button>
    <button onclick="ordenarPorPrecioDesc()">Precios de mayor a menor</button>
</div>`;
  catalogoProductos.forEach((producto) => {
    grillaProductos.innerHTML += `
    <div class="card-1" >
      <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
         <button onclick='agregarAlCarrito("${producto.nombre}", ${producto.precio})'>Agregar al Carrito</button>
    </div>`;
  });
}



function ordenarPorPrecioAsc() {
  catalogoProductos.sort((a, b) => a.precio - b.precio);
  renderizarProductos();
  if (!document.getElementById("esconderCatalogo")) {
    productos.innerHTML += `<div class="container">
    <button id="esconderCatalogo">Esconder catálogo</button>
</div>`;
  }
  const esconderCatalogo = document.getElementById("esconderCatalogo");
  esconderCatalogo.onclick = () => {
    productos.innerHTML = "";
  };
}


function ordenarPorPrecioDesc() {
  catalogoProductos.sort((a, b) => b.precio - a.precio);
  renderizarProductos();
  if (!document.getElementById("esconderCatalogo")) {
    productos.innerHTML += `<div class="container">
    <button id="esconderCatalogo">Esconder catálogo</button>
</div>`;
  }
  const esconderCatalogo = document.getElementById("esconderCatalogo");
  esconderCatalogo.onclick = () => {
    productos.innerHTML = "";
  };
}

function agregarAlCarrito(nombreProducto, precioProducto) {
  if (carrito[nombreProducto]) {
    carrito[nombreProducto].cantidad += 1;
    carrito[nombreProducto].precioTotal += precioProducto;
  } else {
    carrito[nombreProducto] = {
      cantidad: 1,
      precioTotal: precioProducto,
    };
  }

  actualizarCarrito();
}

function eliminarDelCarrito(nombreProducto) {
  if (carrito[nombreProducto]) {
    carrito[nombreProducto].cantidad -= 1;
    carrito[nombreProducto].precioTotal -= catalogoProductos.find(
      (producto) => producto.nombre === nombreProducto
    ).precio;
    if (carrito[nombreProducto].cantidad <= 0) {
      delete carrito[nombreProducto];
    }
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  const mostrar = document.getElementById("mostrarCarrito");
  mostrar.innerHTML = `<div class="container py-3">
        <h2>Tu Carrito </h2>
        </div>`;
  let total = 0;

  for (const nombre in carrito) {
    const item = carrito[nombre];
    mostrar.innerHTML += `<div class="container">
    <p>${item.cantidad} unidades ${nombre} = $${item.precioTotal}</p>
    <button onclick="eliminarDelCarrito('${nombre}')">Eliminar</button>
    </div>`;
    total += item.precioTotal;
    localStorage.setItem("carritoDeCompra", JSON.stringify(carrito));
  }
  
  mostrar.innerHTML += `<div class="container py-3 total"><p class="total">Total: $${total}</p></div>`;

  if (total > 0) {
    mostrar.innerHTML += `<div class="container">
    <button id="detalle" type="button" class="btn-pagar">Pagar</button>
    </div>
    `;
    const detalleBoton = document.getElementById('detalle');
    detalleBoton.onclick = () => {
    mostrarCarrito.innerHTML = `<div class="container">
    <h3>Gracias por tu compra</h3>
    <p class="total">Total: $${total}</p>
    </div>
      <button onclick="volverAlInicio()">Volver al Inicio</button>`;
    }
    } else {
    mostrar.innerHTML += `<p>Aún no tienes productos en tu carrito 😢</p>`;
  }
}




function volverAlInicio(){
  carrito = {};
  nombreInput.value = "";
  mensajePersonalizado.innerText = "¡Bienvenid@ a nuestra tienda!✌🏼";
  contenido.innerHTML = "";
  productos.innerHTML = "";

  const mostrarCarritoDiv = document.getElementById("mostrarCarrito");
  if (mostrarCarritoDiv){
    mostrarCarritoDiv.innerHTML = "";
  } 

  localStorage.clear()
}







  