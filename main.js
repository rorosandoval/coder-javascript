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

const contrasena = "2025";

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
despedida();
