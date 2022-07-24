import alertCard from "./helpers/AlertCard.js";
import hashRouter from "./helpers/HashRouter.js";

export default function cartDisplay() {
  // shopping cart as object
  let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
  let data,
    shippingCost,
    total = 0,
    subtotal = 0,
    taxes = 0;
  let checked = false;
  let idCliente, idEnvio, idCarrito, idOrden;

  const singleItemTemplate = (title, amount, price, index, id) => {
    return `
      <div class="carrito__container__item" data-id="${id}">
        <div class="item-image img-${index}"></div>
        <span class="item-name">${title}</span>
        <span class="item-price">$${price}</span>
        <span class="item-amount">${amount}u</span>
        <div class="item-delete"><img src="/assets/trash.png" alt="delete"></div>
      </div>
      `;
  };
  const $carrito = document.querySelector(".carrito");
  const $carritoTitle = document.querySelector(".carrito__title");
  const $carritoContainer = document.querySelector(".carrito__container");
  const $carritoResume = document.querySelector(".carrito__resume");
  //
  const $resumeShipping = document.querySelector(".resume-shipping > span");
  const $resumeSubrice = document.querySelector(".resume-subprice > span");
  const $resumePrice = document.querySelector(".resume-price > span");
  const $resumeTaxes = document.querySelector(".resume-taxes > span");
  const $resumeButton = document.querySelector(".resume-button");
  //

  // setting up
  const routes = [
    { hash: "", view: () => showCart() }, //
    { hash: "#datos", view: () => showForm() },
    { hash: "#pago", view: () => showPayment(data) },
    { hash: "#recibo", view: () => recibo(checked) },
  ];
  // Router
  hashRouter(routes);

  //
  function loadItems() {
    cart.forEach((el, index) => {
      $carritoContainer.insertAdjacentHTML(
        "beforeend",
        singleItemTemplate(
          el.item.nombre,
          el.amount,
          el.item.precio,
          index,
          el.item.id
        )
      );
      document.querySelector(`.img-${index}`).style.backgroundImage =
        "url(" + el.item.image + ")";
      deleteButton($carritoContainer.lastElementChild);
    });
  }

  function setResume() {
    subtotal = 0;
    cart.forEach((el) => {
      subtotal += el.item.precio * el.amount;
    });
    subtotal = Math.round(subtotal * 100) / 100;
    total = subtotal + shippingCost;
    taxes = Math.round(total * 0.19 * 100) / 100;
    $resumeSubrice.innerHTML = subtotal;
    $resumeTaxes.innerHTML = taxes;
    $resumePrice.innerHTML = Math.round(total * 100) / 100;
  }

  function deleteButton(element) {
    const $button = element.lastElementChild;
    const id = element.dataset.id;

    const handleDelete = () => {
      $button.removeEventListener("click", handleDelete);
      // total = total - (cart[index].item.price * cart[index].amount);
      cart = cart.filter((el) => !(el.item.id === parseInt(id)));
      // Saving
      sessionStorage.setItem("cart", JSON.stringify(cart));
      showCart();
      alertCard("Producto eliminado");
    };
    $button.addEventListener("click", handleDelete);
  }

  function resumeButton() {
    const handleResume = () => {
      $resumeButton.removeEventListener("click", handleResume);
      window.location.hash = routes[1].hash;
    };
    $resumeButton.addEventListener("click", handleResume);
  }

  // CART * * * * * * * * * * * *
  function showCart() {
    //
    $carrito.style.gridTemplateColumns = "3fr 2fr";
    $carritoTitle.innerHTML = `
      <h1>
        <span>C<span class="weight-medium">arrito</span></span>
      </h1>
      `;
    $resumeShipping.innerHTML = "Calculado en el siguiente paso";
    $resumeButton.innerHTML = "Continuar";
    $carritoResume.style.display = "flex";

    // reset container
    $carritoContainer.innerHTML = "";
    if (cart.length === 0) {
      $carritoContainer.innerHTML = `
        <div class="item-alert">El carrito está vacío</div>
      `;
    } else {
      loadItems();
    }
    shippingCost = 0;
    setResume();
    resumeButton();
  }

  // FORM * * * * * * * * * * * *
  function showForm() {
    //
    if (cart.length === 0) {
      window.location.hash = routes[0].hash;
      alertCard("Debes agregar algun producto");
    } else {
    $carritoResume.style.display = "none";

    $carritoTitle.innerHTML = `
    <h1>
      <span>D<span class="weight-medium">atos</span></span>
    </h1>
    `;
    $carrito.style.gridTemplateColumns = "1fr"; //"3fr 2fr"
    $carritoContainer.innerHTML = `
    <form class="form" action="#">
      <div class="form__container">
        <h3>Correo</h3>
      </div>
  
        <!-- email -->
      <div class="form__container">
        <input
          class="form__correo"
          placeholder="Correo electrónico"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="shipping email"
          data-autofocus="true"
          data-backup="customer_email"
          aria-describedby="checkout-context-step-one"
          aria-required="true"
          size="30"
          type="email"
          name="email"
          inputmode="email"
          required
        />
      </div>

      <div class="form__container">
      <h3>Shipping Address</h3>
      </div>
  
        <!-- nombre -->
        <div class="form__container">
        <input
          class="form__nombre"
          placeholder="Nombre"
          autocomplete="shipping given-name"
          autocorrect="off"
          data-backup="first_name"
          aria-required="true"
          size="30"
          type="text"
          name="nombre"
          required
        />
      </div>

  
        <!-- apellido -->
        <div class="form__container">
          <input
          class="form__apellido"
          placeholder="Apellido"
          autocomplete="shipping family-name"
          autocorrect="off"
          data-backup="last_name"
          aria-required="true"
          size="30"
          type="text"
          name="apellido"
          required
        />
      </div>
  
        <!-- direccion -->
        <div class="form__container">
          <input
          class="form__direccion"
          placeholder="Dirección"
          autocomplete="shipping address-line1"
          autocorrect="off"
          data-backup="address1"
          aria-required="true"
          size="30"
          type="text"
          name="direccion"
          required
        />
      </div>
  
      <!-- codigo postal -->
      <div class="form__container">
        <input
        class="form__codigo"
        placeholder="Código postal"
        autocomplete="shipping postal-code"
        autocorrect="off"
        data-backup="zip"
        aria-required="true"
        size="30"
        type="number"
        name="codigo-postal"
        required
      />
    </div>
  
        <!-- comuna -->
        <div class="form__container">
          <input
          class="form__comuna"  
          placeholder="Comuna"
          autocomplete="shipping address-level2"
          autocorrect="off"
          data-backup="city"
          aria-required="true"
          size="30"
          type="text"
          name="comuna"
          required
        />
      </div>
  
        <!-- region -->
        <div class="form__container">
          <select
          required
          class="from__region"
          placeholder="Región"
          autocomplete="shipping address-level1"
          autocorrect="off"
          data-backup="province"
          aria-required="true"
          name="region"
        >
          <option value="" selected>Región
          </option>
          <option
            data-alternate-values='["Arica and Parinacota","Arica y Parinacota","Región de Arica y Parinacota","Region de Arica y Parinacota"]'
            value="AP"
          >
            Arica y Parinacota
          </option>
          <option
            data-alternate-values='["Tarapacá","Tarapaca","Región de Tarapacá","Region de Tarapaca"]'
            value="TA"
          >
            Tarapacá
          </option>
          <option
            data-alternate-values='["Antofagasta","Región de Antofagasta","Region de Antofagasta"]'
            value="AN"
          >
            Antofagasta
          </option>
          <option
            data-alternate-values='["Atacama","Región de Atacama","Region de Atacama"]'
            value="AT"
          >
            Atacama
          </option>
          <option
            data-alternate-values='["Coquimbo","Región de Coquimbo","Region de Coquimbo"]'
            value="CO"
          >
            Coquimbo
          </option>
          <option
            data-alternate-values='["Valparaíso","Valparaiso","Región de Valparaíso","Region de Valparaiso"]'
            value="VS"
          >
            Valparaíso
          </option>
          <option
            data-alternate-values='["Santiago","Región Metropolitana","Region Metropolitana","Región Metropolitana de Santiago","Region Metropolitana de Santiago"]'
            value="RM"
          >
            Santiago
          </option>
          <option
            data-alternate-values='["O&apos;Higgins","Región del Libertador General Bernardo O&apos;Higgins","Region del Libertador General Bernardo O&apos;Higgins"]'
            value="LI"
          >
            O’Higgins
          </option>
          <option
            data-alternate-values='["Maule","Región del Maule","Region del Maule"]'
            value="ML"
          >
            Maule
          </option>
          <option
            data-alternate-values='["Ñuble","Nuble","Región de Ñuble","Region de Nuble"]'
            value="NB"
          >
            Ñuble
          </option>
          <option
            data-alternate-values='["Biobío","Biobio","Región del Biobío","Region del Biobio"]'
            value="BI"
          >
            Biobío
          </option>
          <option
            data-alternate-values='["Araucanía","Araucania","Región de La Araucanía","Region de La Araucania"]'
            value="AR"
          >
            Araucanía
          </option>
          <option
            data-alternate-values='["Los Ríos","Los Rios","Región de Los Ríos","Region de Los Rios"]'
            value="LR"
          >
            Los Ríos
          </option>
          <option
            data-alternate-values='["Los Lagos","Región de Los Lagos","Region de Los Lagos"]'
            value="LL"
          >
            Los Lagos
          </option>
          <option
            data-alternate-values='["Aysén","Aysen","Región Aysén del General Carlos Ibáñez del Campo","Region Aysen del General Carlos Ibanez del Campo"]'
            value="AI"
          >
            Aysén
          </option>
          <option
            data-alternate-values='["Magallanes","Magallanes y la Antártica Chilena","Magallanes y la Antartica Chilena","Magallanes and Chilean Antarctica","Región de Magallanes y de la Antártica Chilena","Region de Magallanes y de la Antartica Chilena"]'
            value="MA"
          >
            Magallanes
          </option>
        </select>
      </div>
  
      <!-- telefono -->
      <div class="form__container">
        <input
        class="form__telefono"
        placeholder="Teléfono (569xxxxxxxx)"
        autocomplete="shipping tel"
        autocorrect="off"
        data-backup="phone"
        data-phone-formatter="true"
        data-phone-formatter-country-select="[name='checkout[shipping_address][country]']"
        aria-required="true"
        size="30"
        type="number"
        min="1" 
        max="999999999"
        name="telefono"
        inputmode="tel"
        required
      />
    </div>
  
        <!-- enviar -->
        <div class="form__container">
          <input class="button-class" id="form-button" type="submit" value="Enviar" />
      </div>

      </form>
    `;
    const $formButton = document.querySelector("#form-button");
    $formButton.value = "Continuar";

    const $form = document.querySelector(".form");
    const handleForm = (e) => {
      // $form.removeEventListener("submit", handleForm);
      e.preventDefault();
      data = Object.fromEntries(new FormData(e.target));
      window.location.hash = routes[2].hash;
    };
    $form.addEventListener("submit", handleForm);
  }
  }

  // PAYMENT * * * * * * * * * * * *
  function showPayment(data) {
    if (!data) {
      // evita el redireccionamiento a pago por url sin previo ingreso de datos
      window.location.hash = routes[1].hash;
      alertCard("Debes ingresar los datos de envío");
    } else {
      shippingCost = 3000;
      setResume();
      $resumeShipping.innerHTML = "$" + shippingCost;
      $resumeButton.innerHTML = "Finalizar el pedido";
      $carritoTitle.innerHTML = `
    <h1>
      <span>P<span class="weight-medium">ago</span></span>
    </h1>
    `;
      $carrito.style.gridTemplateColumns = "3fr 2fr";
      $carritoResume.style.display = "flex";
      $carritoContainer.innerHTML = `
      <div class="payment">
      <h3>Resumen de la información</h3>

          <div class="payment__resume">
            <div class="payment__resume__contacto">Contacto: <span></span></div>
            <hr>
            <div class="payment__resume__address">Enviar a: <span></span></div>
            <hr>
            <div class="payment__resume__shipping">Método: <span></span></div>
          </div>
          <h3>Todas las transacciones son seguras y están encriptadas.</h3>

          <div class="payment__notice">
            <img src="/assets/outside.svg" alt="outside">
            <div>Luego de hacer clic en “Finalizar el pedido”, serás redirigido a
              Pago Fácil - WebpayPlus para completar tu compra de forma segura.</div>
          </div>
      </div>
    `;

      const $paymentResumeContact = document.querySelector(
        ".payment__resume__contacto > span"
      );
      const $paymentResumeAddress = document.querySelector(
        ".payment__resume__address > span"
      );
      const $paymentResumeShipping = document.querySelector(
        ".payment__resume__shipping > span"
      );

      $paymentResumeContact.innerHTML = data.email;
      $paymentResumeAddress.innerHTML = `${data.direccion}, ${data.comuna}, ${data.region}`
      $paymentResumeShipping.innerHTML = "Starken Classic"
      //
      endButton(data);
    }
  }

  function endButton(data) {
    const handleResume = async () => {
      $resumeButton.removeEventListener("click", handleResume);
        alertCard("Compra realizada con exito!");

      // - - - - - - - - - - - - - 
      for (const product of cart) {
        const resta = parseInt(product.item.stock) - parseInt(product.amount);
        //
        await fetch("http://localhost:5003/api/Producto" +"/"+ parseInt(product.item.id), {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id:  product.item.id,
              nombre:  product.item.nombre,
              descripcion: product.item.descripcion,
              stock: resta < 1 ? 0 : resta.toString(),
              precio: product.item.precio,
              estado: resta < 1 ? "unavailable" : product.item.estado,
          }),
          })
          .catch((err) => console.log(err));
       };

    // - - - - - - - - - - - - - 
        await fetch("http://localhost:5003/api/Cliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombreCliente: data.nombre,
                apellidoCliente: data.apellido,
                emailCliente: data.email,
                telefonoCliente: data.telefono,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                idCliente = data.id
            })
            .catch((err) => console.log(err));
        // - - - - - - - - - - - - - 
        await fetch("http://localhost:5003/api/Envio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                PrecioEnvio: shippingCost,
                FechaEnvio: new Date("2022-06-17"),
                DireccionEnvio: data.direccion,
                RegionEnvio: data.region
            }),
        })
            .then((response) => response.json())
            .then((data) => {
              idEnvio = data.id
            })
            .catch((err) => console.log(err));

        // - - - - - - - - - - - - - 
        await fetch("http://localhost:5003/api/Carrito", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                PrecioSubtotal: subtotal,
                IdCliente: idCliente
            }),
        })
            .then((response) => response.json())
            .then((data) => {
              idCarrito = data.id
            })
            .catch((err) => console.log(err));

         // - - - - - - - - - - - - - 
         for (const product of cart) {
          await fetch("http://localhost:5003/api/Items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CantidadItem:  product.amount,
                PrecioItem:  product.item.precio,
                PrecioTotalItem:  (product.amount * product.item.precio),
                IdProducto:  product.item.id,
                IdCarrito: idCarrito,
            }),
            })
            .then((response) => response.json())
            //.then((data) => {
            //  console.log(data)
              //idCarrito = data.id
            //})
            .catch((err) => console.log(err));
         };

         // - - - - - - - - - - - - - 
        await fetch("http://localhost:5003/api/Orden", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              FechaCreacion: new Date(),
              Estado: "activo",
              PrecioTotal: total,
              IdCarrito: idCarrito,
              IdEnvio: idEnvio
          }),
        })
            .then((response) => response.json())
            .then((data) => {
              //console.log(data)
              idOrden= data.id
            })
            .catch((err) => console.log(err));

        // - - - - - - - - - - - - - 
        checked = true;
        window.location.hash = routes[3].hash;
            

    };
    $resumeButton.addEventListener("click", handleResume);
  }
  //
   // RECIBO * * * * * * * * * * * *
   function recibo(checked) {
    //
    if (!checked) {
      window.location.hash = routes[1].hash;
      alertCard("Debes concretar el pago");
    } else {
      $carritoResume.style.display = "none";
      $carritoTitle.innerHTML = `
      <h1>
        <span>R<span class="weight-medium">ecibo</span></span>
      </h1>
      `;
      $carrito.style.gridTemplateColumns = "1fr";
      $carritoContainer.innerHTML = `
        <div class="recibo__container">
          <div>ID de la Orden: <span>${idOrden}</span></div>
          <div>Fecha de creación: <span>${new Date}</span></div>
          <div>Estado: <span>${"Activo"}</span></div>
          <div>Precio total: <span>$${total}</span></div>
        </div>
      `    
    }
  }
  //
}
 