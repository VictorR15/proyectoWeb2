// Cargar el carrito desde localStorage
let articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Variables
const contenedorCarritoPage = document.querySelector(
  ".carrito__contenedor-page"
);
const contenedorCarrito = document.querySelector(".carrito__contenedor");
const actualizarTotal = document.querySelector(".carrito__subtotal-precio");
const actualizarTotalCarrito = document.querySelector(".carrito__precio-total");

llamadaFunciones();

function llamadaFunciones() {
  mostrarProductos();
  contenedorCarritoPage.addEventListener("click", eliminarProducto);
}

function mostrarProductos() {
  actualizaCarrito();
  limpiarCarritoPage();

  let total = 0;

  // Actualizamos el carrito del header
  articulosCarrito.forEach((producto) => {
    const productoAgregar = document.createElement("div");
    productoAgregar.innerHTML = `
        <div class="carrito__canasta"> 
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
    contenedorCarrito.appendChild(productoAgregar);
  });

  // Actualizamos los productos en la página del carrito
  articulosCarrito.forEach((producto) => {
    const productoAgregar = document.createElement("div");
    productoAgregar.innerHTML = `
    <div class="carrito__producto">
      <div class="carrito__img">
        <img src="${producto.imagen}" alt="imagenProducto">
      </div>
      <div class="carrito__descripcion">
        ${producto.descripcion}
      </div>
      <div class="carrito__cantidad">${producto.cantidad}</div>
      <div class="carrito__precio">${producto.precio}</div>
      <input
                    type="submit"
                    value="X"
                    class="carrito__borrar-btn"
                    data-id=${producto.id}
                  />
    </div>
    `;
    contenedorCarritoPage.appendChild(productoAgregar);
    total += parseInt(producto.cantidad * producto.precio.slice(1));
  });

  actualizarTotal.innerHTML = `$${total}`;
  actualizarTotalCarrito.innerHTML = `$${total}`;
}

// Eliminar producto
function eliminarProducto(e) {
  if (e.target.classList.contains("carrito__borrar-btn")) {
    const productoId = e.target.getAttribute("data-id");

    // Eliminar el producto del arreglo
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoId
    );

    // Actualizar el localStorage
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));

    // Actualizar la interfaz
    mostrarProductos();
  }
}

// Actualiza los productos del carrito
function actualizaCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

// Limpia los productos de la página del carrito
function limpiarCarritoPage() {
  while (contenedorCarritoPage.firstChild) {
    contenedorCarritoPage.removeChild(contenedorCarritoPage.firstChild);
  }
}
