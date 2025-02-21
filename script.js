const contndrCarrito = document.getElementById("contenedor-carrito");
const contndrProduct = document.getElementById("contenedor-productos");
const tarjetas = document.getElementById("contenedor-tarjetas");
const btnCarrito = document.getElementById("boton-carrito");
const btnLimpiarCarrito = document.getElementById("boton-limpiar-carrito");
const totalItems = document.getElementById("total-items");
const subtotalCarrito = document.getElementById("subtotal");
const totalCarrito = document.getElementById("total");
const btnVerNoVerCarrito = document.getElementById("mostrar-ocultar-carrito");
const carritoPag = document.getElementById("numero-items")
let carritoMostrando = false;

const productos = [
  {
    id: 1,
    name: "Alegrías de Amaranto",
    price: 249.99,
    category: "Dulce",
  },
  {
    id: 2,
    name: "Mazapán de Cacahuate",
    price: 79.99,
    category: "Dulce",
  },
  {
    id: 3,
    name: "Cocada",
    price: 79.99,
    category: "Dulce",
  },
  {
    id: 4,
    name: "Paleta de Tamarindo",
    price: 119.99,
    category: "Dulce",
  },
  {
    id: 5,
    name: "Cajeta",
    price: 219.99,
    category: "Dulce",
  },
  {
    id: 6,
    name: "Glorias",
    price: 59.99,
    category: "Dulce",
  },
  {
    id: 7,
    name: "Obleas con Cajeta",
    price: 199.99,
    category: "Dulce",
  },
  {
    id: 8,
    name: "Tamarindo con Chile",
    price: 99.99,
    category: "Dulce",
  },
  {
    id: 9,
    name: "Cacahuates Garapiñados",
    price: 59.99,
    category: "Dulce",
  },
  {
    id: 10,
    name: "Churros",
    price: 59.99,
    category: "Dulce",
  },
  {
    id: 11,
    name: "Borrachitos",
    price: 239.99,
    category: "Dulce",
  },
  {
    id: 12,
    name: "Camotes",
    price: 259.99,
    category: "Dulce",
  },
  {
    id: 13,
    name: "Amaranto con Chocolate",
    price: 299.99,
    category: "Dulce",
  },
  {
    id: 14,
    name: "Mazapán de Pistache",
    price: 89.99,
    category: "Dulce",
  },
  {
    id: 15,
    name: "Cocada con Nuez",
    price: 99.99,
    category: "Dulce",
  },
  {
    id: 16,
    name: "Paleta de Mango con Chile",
    price: 129.99,
    category: "Dulce",
  },
  {
    id: 17,
    name: "Cajeta con Nuez",
    price: 229.99,
    category: "Dulce",
  },
  {
    id: 19,
    name: "Obleas con Chocolate",
    price: 209.99,
    category: "Dulce",
  },
  {
    id: 20,
    name: "Tamarindo con Chamoy",
    price: 109.99,
    category: "Dulce",
  },
  {
    id: 21,
    name: "Cacahuates Enchilados",
    price: 69.99,
    category: "Dulce",
  }
];

// Renderizar tarjetas
productos.forEach(
  ({ name, id, price, category }) => {
    tarjetas.innerHTML += `
      <div class="tarjeta">
        <h2>${name}</h2>
        <p class="precio-postre">$${price} MXN</p>
        <p class="categoria-producto">Categoría: ${category}</p>
        <button 
          id="${id}" 
          class="boton boton-agregar-carrito">Agregar
        </button>
      </div>
    `;
  }
);

class CarritoDeCompras {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  // Agregar un item al carrito
  agregarItem(id, productos) {
    const producto = productos.find((item) => item.id === id);
    const { name, price } = producto;
    this.items.push(producto);

    const totalCountPerProduct = {};
    this.items.forEach((postre) => {
      totalCountPerProduct[postre.id] = (totalCountPerProduct[postre.id] || 0) + 1;
    });

    const currentProductCount = totalCountPerProduct[producto.id];
    let currentProductCountSpan = document.getElementById(`cantidad-producto-para-id${id}`);

    if (currentProductCount > 1 && currentProductCountSpan) {
      currentProductCountSpan.textContent = `${currentProductCount}x`;
    } else {
      contndrProduct.innerHTML += `
      <div id="postre${id}" class="producto">
        <p>
          <span class="cantidad-producto" id="cantidad-producto-para-id${id}"></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `;
      currentProductCountSpan = document.getElementById(`cantidad-producto-para-id${id}`);
      currentProductCountSpan.textContent = `${currentProductCount}x`;
    }
  }

  // Obtener la cantidad de items en el carrito
  obtenerCantidad() {
    return this.items.length;
  }

  // Limpiar
  limpiarCarrito() {
    if (!this.items.length) {
      alert("Tu carrito de compras ya está vacío");
      return;
    }

    const isCartCleared = confirm(
      "¿Estás seguro de que quieres limpiar todos los artículos de tu carrito de compras?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      contndrProduct.innerHTML = "";
      totalItems.textContent = 0;
      subtotalCarrito.textContent = 0;
      totalCarrito.textContent = 0;
      carritoPag.innerText = 0;
      carritoMostrando = !carritoMostrando;
      contndrCarrito.style.display = "none";
      btnVerNoVerCarrito.textContent = "Mostrar";
    }
  }

  // Calcular el total
  calcularTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    this.total = subTotal;
    subtotalCarrito.textContent = `$${subTotal.toFixed(2)}`;
    totalCarrito.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
};

const carrito = new CarritoDeCompras();
const botonesAgregarCarrito = document.getElementsByClassName("boton-agregar-carrito");

// Todos los botones de agregar
[...botonesAgregarCarrito].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      carrito.agregarItem(Number(event.target.id), productos);
      totalItems.textContent = carrito.obtenerCantidad();
      carrito.calcularTotal();
      carritoPag.innerText = carrito.obtenerCantidad();
    })
  }
);

// mostrar/ocultar el carrito
btnCarrito.addEventListener("click", () => {
  carritoMostrando = !carritoMostrando;
  btnVerNoVerCarrito.textContent = carritoMostrando ? "Ocultar" : "Mostrar";
  contndrCarrito.style.display = carritoMostrando ? "block" : "none";
});

// Limpiar carrito
btnLimpiarCarrito.addEventListener("click", carrito.limpiarCarrito.bind(carrito) )