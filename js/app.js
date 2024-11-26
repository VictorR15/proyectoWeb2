const carrito = document.querySelector(".carrito");
const contenedorCarrito = document.querySelector(".carrito__contenedor");
const vaciarCarritoBtn = document.querySelector(".carrito__borrar");
const listaProductos = document.querySelector(".productos__section");
const actualizarTotal = document.querySelector(".carrito__precio-total");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  /* Agregamos un cursos presionando el btn */
  listaProductos.addEventListener("click", agregarProducto);

  /* Eliminamos cursos del carrito */
  carrito.addEventListener("click", eliminarProducto);

  /* Mostramos lo que esta en el Storage */
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("Carrito cargado desde localStorage:", articulosCarrito);
    console.log("Contenedor del carrito:", contenedorCarrito);

    carritoProductos();
  });

  /* Vaciar carrito */
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //Reseteamos el carrito
    carritoProductos(); //Eliminamos todo el carrito
  });
}

/* Funciones */

function agregarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("producto__btn")) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosProducto(productoSeleccionado);
  }
}

//Eliminar producto
function eliminarProducto(e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("carrito__borrar-btn")) {
    const productoId = e.target.getAttribute("data-id");

    //Elimina el arreglo dede articulosCarrito
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoId
    );
    carritoProductos(); //Iteramos sobre el carrito y lo actualizamos
  }
}

//Lee el card del producto y extrae la info

function leerDatosProducto(producto) {
  //   console.log(producto);

  //Crear un objeto con la info del producto
  const infoProducto = {
    imagen: producto.querySelector(".producto__imagen").src,
    descripcion: producto.querySelector("h3").textContent,
    precio: producto.querySelector(".producto__precio").textContent,
    id: producto.querySelector("input").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisar si el elemento ya existe en el carrito
  const existe = articulosCarrito.some(
    (producto) => producto.id === infoProducto.id
  );
  if (existe) {
    //Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; //retorna el objeto actulizado con los duplicados
      } else {
        return producto; //retorna el objeto sin que esten duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    //Agregar productos al carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }

  console.log(infoProducto);
  carritoProductos();
}

//Mostrar productos en el carrito
function carritoProductos() {
  //Limpiar el carrito
  actualizaCarrito();
  let total = 0;

  articulosCarrito.forEach((producto) => {
    const productoAgregar = document.createElement("div");
    productoAgregar.innerHTML = `
        <div class = "carrito__canasta"> 
            <img src="${producto.imagen}" alt="imagenProducto">
            <p class="carrito__descripcion">${producto.descripcion}</p>
            <p class="carrito__precio">${producto.precio}</p>
            <p class="carrito__cantidad">${producto.cantidad}</p>
            <input
                    type="submit"
                    value="X"
                    class="carrito__borrar-btn"
                    data-id=${producto.id}
                  />
        </div>
      `;
    //Agregar el HTML del carrito al div
    contenedorCarrito.appendChild(productoAgregar);
    total = total + parseInt(producto.cantidad * producto.precio.slice(1));
  });
  actualizarTotal.innerHTML = `$${total}`;

  //Agregar el carrito al storage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//Actualiza los Productos del carrito
function actualizaCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
