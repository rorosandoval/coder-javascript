/* 

Segunda entrega - flujo de compra

1- La tienda te saluda por tu nombre y cada vez que regreses lo hará.
2- Puedes explorar los productos, ordenarlos de manera ascendente o descendente según su precio.
3- Puedes añadir productos al carrito.
4- Puedes controlar tu carrito en cuanto a unidades y total de compra.
5- Ves en el carrito cuanto es lo que tienes que pagar.
6- Si cierras la página, la tienda recordará tu carrito y tu nombre.
7- Al momento de pagar, la página te da las gracias y te invita a volver al inicio.

*/
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
    imagen: "img/monitor.avif",
  },
  {
    producto: 2,
    nombre: "Teclado Gamer - Logitech",
    precio: 110000,
    imagen: "img/teclado.jpg",
  },
  {
    producto: 3,
    nombre: "Mouse vertical ergonómico - Logitech",
    precio: 70000,
    imagen: "img/mouse.webp",
  },
  {
    producto: 4,
    nombre: "Mouse Pad Gamer 120cm - HP",
    precio: 25000,
    imagen: "img/mouse-pad.webp",
  },
  {
    producto: 5,
    nombre: "Audífonos Gamer con micrófono - HyperX",
    precio: 95000,
    imagen: "img/audifonos.webp",
  },
  {
    producto: 6,
    nombre: "Webcam Full HD - Logitech",
    precio: 60000,
    imagen: "img/webcam.webp",
  },
  {
    producto: 7,
    nombre: "Impresora Multifuncional - Epson",
    precio: 180000,
    imagen: "img/impresora.jpg",
  },
  {
    producto: 8,
    nombre: "Disco Duro Externo 1TB - Seagate",
    precio: 75000,
    imagen: "img/discoduro.webp",
  },
  {
    producto: 9,
    nombre: "Router Wi-Fi Doble Banda - TP-Link",
    precio: 50000,
    imagen: "img/router.jpg",
  },
];

let carrito = {};

const usuarioGuardado = localStorage.getItem("nombreDeUsuario");
if (usuarioGuardado) {
  nombreInput.value = usuarioGuardado;
  mensajePersonalizado.innerText = `¡${usuarioGuardado}, bienvenid@ nuevamente a nuestra tienda!✌🏼`;
} else {
  mensajePersonalizado.innerText = `¡Bienvenid@ a nuestra tienda!✌🏼`;
}

const carritoGuardado = JSON.parse(localStorage.getItem("carritoDeCompra"));
if (carritoGuardado) {
  carrito = carritoGuardado;
  actualizarCarrito();
}

entrarTienda.onclick = () => {
  const nombreIngresado = nombreInput.value;
  if (nombreIngresado) {
    nombreInput.value = nombreIngresado;
    mensajePersonalizado.innerText = `¡${nombreIngresado}, hoy es un buen día para comprar! 😎`;
    localStorage.setItem("nombreDeUsuario", nombreIngresado);
  } else {
    mensajePersonalizado.innerText = `¡Hoy es un buen día para comprar! 😎`;
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
    const detalleBoton = document.getElementById("detalle");
    detalleBoton.onclick = () => {
      mostrarCarrito.innerHTML = `<div class="container">
    <h3>Gracias por tu compra</h3>
    <p class="total">Total: $${total}</p>
    </div>
      <button onclick="volverAlInicio()">Volver al Inicio</button>`;
    };
  } else {
    mostrar.innerHTML += `<p>Aún no tienes productos en tu carrito 😢</p>`;
  }
}

function volverAlInicio() {
  carrito = {};
  nombreInput.value = "";
  mensajePersonalizado.innerText = "¡Bienvenid@ a nuestra tienda!✌🏼";
  contenido.innerHTML = "";
  productos.innerHTML = "";

  const mostrarCarritoDiv = document.getElementById("mostrarCarrito");
  if (mostrarCarritoDiv) {
    mostrarCarritoDiv.innerHTML = "";
  }

  localStorage.clear();
}
