let baseDeDatos = [
  {
    id: 1,
    title: "Laptop",
    precio: 2000,
    marca: "msi",
    descripcion: "Intel Core i7 8th Gen",
  },
  {
    id: 2,
    title: "Mouse",
    precio: 150,
    marca: "HP",
    descripcion: "RGB Gaming",
  },
  {
    id: 3,
    title: "Teclado",
    precio: 200,
    marca: "HP",
    descripcion: "RGB Mecanico",
  },
];

class Producto {
  constructor([]) {
    baseDeDatos.forEach((element) => {
      this.id = element.id;
      this.title = element.title;
      this.precio = element.precio;
      this.marca = element.marca;
      this.descripcion = element.descripcion;
      /*   this.cantidad = element.cantidad; */
    });
  }
  productosDisponibles() {
    let lista = [];
    baseDeDatos.forEach((element) => {
      lista.push(
        element.id +
          "         " +
          element.title +
          "        " +
          element.precio +
          "$" +
          "           " +
          element.marca +
          "           " +
          element.descripcion +
          "                   " +
          element.cantidad +
          "\n\n"
      );
    });
    return lista.join("");
  }
  encontrarPorId(id) {
    return baseDeDatos.find((element) => element.id === id);
  }
  encontrarPorNombre(title) {
    let searchTitle = [];
    baseDeDatos.filter((element) => {
      if (element.title === title) {
        searchTitle.push(element);
      }
    });
    return searchTitle;
  }
  encontrarPorPrecio(precio) {
    let searchPrecio = [];
    baseDeDatos.forEach((element) => {
      if (element.precio === precio) {
        searchPrecio.push(element);
      }
    });
    searchPrecio.forEach((element) => {
      console.log(element);
    });
  }
}

let producto = new Producto(baseDeDatos);
producto.productosDisponibles();
/* console.log(producto.encontrarPorId(2)); */

class CarritoCompra {
  constructor([]) {
    this.carrito = [];
  }
  agregarProducto(producto) {
    this.carrito.push(producto);
    return this.carrito;
  }

  eliminarProducto(id) {
    let eliminar = this.carrito.filter((element) => element.id === id);
    this.carrito.splice(this.carrito.indexOf(eliminar), 1);
    return this.carrito;
  }

  eliminarTodo() {
    this.carrito = [];
    return this.carrito;
  }

  montoDelCarrito() {
    let monto = 0;
    this.carrito.forEach((element) => {
      monto += element.precio;
    });
    return monto;
  }
  mostrarCarrito() {
    let lista = [];
    this.carrito.forEach((element) => {
      lista.push(
        element.id +
          "         " +
          element.title +
          "        " +
          element.precio +
          "$" +
          "           " +
          element.marca +
          "           " +
          element.descripcion +
          "                   " +
          element.cantidad +
          "\n\n"
      );
    });
    return lista.join("");
  }
}
let carrito = new CarritoCompra(baseDeDatos);

class Pagar {
  constructor([]) {
    this.carrito = [];
    this.impuesto = 0.16;
    this.descuento = 0.05;
  }
  calcularCarrito(carrito) {
    let monto = 0;
    carrito.forEach((element) => {
      monto += element.precio;
    });

    let montoCarrito = monto;
    let descuento = montoCarrito * this.descuento;
    let subtotal = montoCarrito - descuento;
    let impuesto = subtotal * this.impuesto;
    let total = subtotal + impuesto;

    let totales = [montoCarrito, descuento, subtotal, impuesto, total];
    return totales;
  }

  imprimirFactura() {
    const pagar = new Pagar(baseDeDatos);
    let factura = pagar.calcularCarrito(carrito.carrito);
    return alert(
      `ID:   |  TITULO:      |   PRECIO:   |   MARCA:   |   DESCRIPCION:   | \n\n${carrito.mostrarCarrito()}\nMonto neto sin descuento: ${
        factura[0]
      }\nDescuento: ${factura[1]}$\nSub-Total: ${factura[2]}$\nImpuestos: ${
        factura[3]
      }$\nTotal a pagar:  ${factura[4]}$`
    );
  }
}

let pago = new Pagar(baseDeDatos);
pago.imprimirFactura();

function main() {
  let producto = new Producto(baseDeDatos);
  let carrito = new CarritoCompra(baseDeDatos);
  let pago = new Pagar(baseDeDatos);
  let salir = false;
  while (!salir) {
    let op = prompt(
      "1. Productos disponibles\n2. Agregar producto al carrito\n3. Eliminar producto\n4. Mostrar productos en el carrito\n5. Costo actual del carrito de compras\n6. Imprimir factura\n7. Salir"
    );

    switch (op) {
      case "1":
        alert(
          `LISTA DE PRODUCTOS DISPONIBLES:\n\nID:  TITULO:      |   PRECIO:   |   MARCA:   |   DESCRIPCION:   | \n\n${producto.productosDisponibles()}`
        );
        break;
      case "2":
        let id = parseInt(
          prompt(`LISTA DE PRODUCTOS DISPONIBLES:\n\nID:  TITULO:      |   PRECIO:   |   MARCA:   |   DESCRIPCION:   | \n\n${producto.productosDisponibles()}
        INGRESE EL ID DEL PRODUCTO QUE DESEA AGREGAR AL CARRITO`)
        );
        let productoAgregar = producto.encontrarPorId(id);
        carrito.agregarProducto(productoAgregar);
        alert(`EL PRODUCTO HA SIDO AGREGADO AL CARRITO!!! 
        ${carrito.mostrarCarrito()}`);
        break;
      case "3":
        let idEliminar = parseInt(
          prompt("Ingrese el id del producto a eliminar")
        );
        carrito.eliminarProducto(idEliminar);
        break;
      case "4":
        alert(
          `LISTA DE PRODUCTOS DISPONIBLES:\n\nID:  TITULO:      |   PRECIO:   |   MARCA:   |   DESCRIPCION:   | \n\n${carrito.mostrarCarrito()}`
        );
        break;
      case "5":
        alert(
          `Monto acumulado en el carrito de compra:  ${carrito.montoDelCarrito()}$`
        );
        break;
      case "6":
        pago.imprimirFactura();
        break;
      case "7":
        salir = true;
        break;
      default:
        alert("ERROR!!!  Por favor, ingrese una opcion valida");
        break;
    }
  }
}
main();
