let baseDeDatos = [
  {
    id: 1,
    title: "Laptop",
    precio: 2000,
    marca: "msi",
    descripcion: "Intel Core i7",
  },
  {
    id: 2,
    title: "Mouse",
    precio: 150,
    marca: "HP",
    descripcion: "",
  },
  {
    id: 3,
    title: "Teclado",
    precio: 200,
    marca: "HP",
    descripcion: "",
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
      this.cantidad = element.cantidad;
    });
  }
  productosDisponibles() {
    let lista = [];
    baseDeDatos.forEach((element) => {
      lista.push("id:" + element.id + "\n");
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
    let productoEliminado = this.carrito.find((element) => element.id === id);
    this.carrito.splice(this.carrito.indexOf(productoEliminado), 1);
    return this.carrito;
  }

  eliminarTodo() {
    this.carrito = [];
    return this.carrito;
  }

  montoTotal() {
    let monto = 0;
    this.carrito.forEach((element) => {
      monto += element.precio;
    });
    return monto;
  }
  mostrarCarrito() {
    let lista = [];
    console.log(
      `ID:   |  TITULO:      |   PRECIO:   |   MARCA:   |   DESCRIPCION:   |  `
    );
    this.carrito.forEach((element) => {
      lista.push(
        element.id +
          "       | " +
          element.title +
          "      | " +
          element.precio +
          "         | " +
          element.marca +
          "         | " +
          element.descripcion +
          "                 | " +
          element.cantidad +
          "\n\n"
      );
    });
    return alert(
      "ID:   |  TITULO:      |   PRECIO:   |   MARCA:   |   DESCRIPCION:   | \n\n" +
        lista.join("")
    );
  }
}

let carrito = new CarritoCompra(baseDeDatos);
carrito.agregarProducto(producto.encontrarPorId(2));
carrito.agregarProducto(producto.encontrarPorId(3));
carrito.mostrarCarrito();
carrito.eliminarProducto(3);
carrito.mostrarCarrito();
carrito.eliminarTodo();
carrito.mostrarCarrito();
