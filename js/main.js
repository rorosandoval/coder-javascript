const nombreInput = document.getElementById("nombreInput");
const entrarTienda = document.getElementById("entrarTienda");
const mensajePersonalizado = document.getElementById("mensajePersonalizado");
const contenido = document.getElementById("contenido");
const grillaProductos = document.getElementById("productos");

let catalogoProductos;
let carrito = {};

obtenerProductos();

function obtenerProductos() {
  fetch("./json_data/bd.JSON")
    .then((response) => response.json())
    .then((data) => {
      catalogoProductos = data;
      if (carrito) {
        actualizarCarrito();
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "¡Ups! Hubo un problema",
        text: "No pudimos cargar nuestro catálogo de productos. Por favor, intenta de nuevo más tarde.",
        footer: error,
      });
    });
}

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
}

entrarTienda.onclick = () => {
  const nombreIngresado = nombreInput.value.trim();
  if (nombreIngresado) {
    nombreInput.value = nombreIngresado;
    mensajePersonalizado.innerText = `¡${nombreIngresado}, hoy es un buen día para comprar! 😎`;
    localStorage.setItem("nombreDeUsuario", nombreIngresado);
  } else {
    mensajePersonalizado.innerText = `¡Hoy es un buen día para comprar! 😎`;
  }
  if (!document.getElementById("mostrarCatalogo")) {
    contenido.innerHTML += `
    <p>Aquí encontrarás lo que estás buscando para trabajar desde Casa 😁</p>
    <button id="mostrarCatalogo">Revisa nuestro catálogo</button>`;
    const mostrarCatalogo = document.getElementById("mostrarCatalogo");
    mostrarCatalogo.onclick = () => {
      renderizarProductos();
      if (!document.getElementById("esconderCatalogo")) {
        grillaProductos.innerHTML += `
        <div class="container">
          <button id="esconderCatalogo">Esconder catálogo</button>
        </div>`;
      }
      const esconderCatalogo = document.getElementById("esconderCatalogo");
      esconderCatalogo.onclick = () => {
        grillaProductos.innerHTML = "";
      };
    };
  }
};

function renderizarProductos() {
  grillaProductos.innerHTML = `
  <div class="container d-flex justify-content-between d-grid gap-3 btn-ascc-desc">
    <button onclick="ordenarPorPrecioAsc()">Precios de menor a mayor</button>
    <button onclick="ordenarPorPrecioDesc()">Precios de mayor a menor</button>
  </div>`;
  catalogoProductos.forEach((producto) => {
    const productoSinComilla = producto.nombre;
    grillaProductos.innerHTML += `
      <div class="card-1">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p class="modelo">${producto.producto}<p>
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onclick='agregarAlCarrito("${productoSinComilla}", ${producto.precio})'>Agregar al Carrito</button>
      </div>`;
  });
}

function ordenarPorPrecioAsc() {
  catalogoProductos.sort((a, b) => a.precio - b.precio);
  renderizarProductos();
  agregarBotonEsconder();
}

function ordenarPorPrecioDesc() {
  catalogoProductos.sort((a, b) => b.precio - a.precio);
  renderizarProductos();
  agregarBotonEsconder();
}

function agregarBotonEsconder() {
  if (!document.getElementById("esconderCatalogo")) {
    grillaProductos.innerHTML += `
    <div class="container">
      <button id="esconderCatalogo">Esconder catálogo</button>
    </div>`;
  }
  const esconderCatalogo = document.getElementById("esconderCatalogo");
  esconderCatalogo.onclick = () => {
    grillaProductos.innerHTML = "";
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
  Toastify({
    text: `Agregaste ${nombreProducto}`,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    close: true,
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "#fff",
    },
  }).showToast();
}

function sumarUnidad(nombreProducto) {
  carrito[nombreProducto].cantidad += 1;
  carrito[nombreProducto].precioTotal += catalogoProductos.find(
    (p) => p.nombre === nombreProducto
  ).precio;
  actualizarCarrito();
}

function restarUnidad(nombreProducto) {
  carrito[nombreProducto].cantidad -= 1;
  carrito[nombreProducto].precioTotal -= catalogoProductos.find(
    (p) => p.nombre === nombreProducto
  ).precio;
  if (carrito[nombreProducto].cantidad <= 0) {
    delete carrito[nombreProducto];
  }
  actualizarCarrito();
}

function eliminarDelCarrito(nombreProducto) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: `¿Quieres eliminar ${nombreProducto} del carrito?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#cddc39",
    cancelButtonColor: "#bdbdbd",
    confirmButtonText: "Sí, eliminarlo",
    cancelButtonText: "No, fué un error",
  }).then((result) => {
    if (result.isConfirmed) {
      delete carrito[nombreProducto];
      actualizarCarrito();
      Swal.fire({
        title: "¡Eliminado!",
        text: `${nombreProducto} ha sido eliminado del carrito.`,
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#cddc39",
      });
    }
  });
}

function actualizarCarrito() {
  const mostrar = document.getElementById("mostrarCarrito");
  mostrar.innerHTML = `
  <div class="container py-3">
    <h2>Tu Carrito</h2>
  </div>`;

  const itemEnCarrito = [];
  for (const nombre of Object.keys(carrito)) {
    itemEnCarrito.push({ nombre, ...carrito[nombre] });
  }

  if (itemEnCarrito.length === 0) {
    mostrar.innerHTML += `<p>Aún no tienes productos en tu carrito 😢</p>`;
    localStorage.removeItem("carritoDeCompra");
    return;
  }

  itemEnCarrito.forEach((item) => {
    mostrar.innerHTML += `
      <div class="container carrito-compras">
        <span>${item.cantidad} unidades ${item.nombre} = $${item.precioTotal}</span>
        <div class="botones">
        <button class="btn-carrito" onclick="sumarUnidad('${item.nombre}')">+</button>
        <button class="btn-carrito" onclick="restarUnidad('${item.nombre}')">-</button>
        <button class="btn-carrito" onclick="eliminarDelCarrito('${item.nombre}')"><i class="bi bi-trash3"></i></button>
        </div>

      </div>
    `;
  });

  const total =
    Math.round(
      itemEnCarrito.reduce(
        (totalAcumulado, item) => totalAcumulado + item.precioTotal,
        0
      ) * 100
    ) / 100;

  mostrar.innerHTML += `<div class="container py-3 total">
    <p class="total">Total: $${total}</p>
  </div>`;

  localStorage.setItem("carritoDeCompra", JSON.stringify(carrito));

  if (total > 0) {
    mostrar.innerHTML += `<div class="container">
      <button id="detalle" type="button" class="btn-pagar">Pagar</button>
    </div>`;

    const detalleBoton = document.getElementById("detalle");
    detalleBoton.onclick = () => {
      Swal.fire({
        html: `Tu compra por un total de $${total} está siendo procesada`,
        title: "¡Gracias por comprar en nuestra Tienda!",
        icon: "success",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#cddc39",
        draggable: true,
        allowOutsideClick: false,
        footer: "Pronto nos comunicaremos contigo",
      }).then((result) => {
        if (result.isConfirmed) {
          carrito = {};
          localStorage.removeItem("carritoDeCompra");

          mostrar.innerHTML = `<div class="container">
        <h3>Gracias por comprar en nuestra Tienda</h3>
        <p>¿Olvidaste algo?</p>
        <p>Puedes seguir navegando y agregando productos o si prefieres, puedes volver al inicio 😁</p>
        <button onclick="volverAlInicio()">Volver al Inicio</button>
      </div>`;
        }
      });
    };
  }
}

function volverAlInicio() {
  carrito = {};
  nombreInput.value = "";
  mensajePersonalizado.innerText = "¡Bienvenid@ a nuestra tienda!✌🏼";
  contenido.innerHTML = "";
  grillaProductos.innerHTML = "";

  const mostrarCarritoDiv = document.getElementById("mostrarCarrito");
  if (mostrarCarritoDiv) {
    mostrarCarritoDiv.innerHTML = "";
  }

  localStorage.clear();
}
