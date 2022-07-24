import alertCard from "./helpers/AlertCard.js";
import hashRouter from "./helpers/HashRouter.js";
import titleToHash from "./helpers/TitleToHash.js";

// fetch petition
export default function productDisplay() {
  fetch("http://localhost:5003/api/Producto")
    .then((res) => res.json())
    .then((json) => {
      productSetUp(json);
    });
}

function productSetUp(json) {
  // var and const defintion
  let hash, amount;
  const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
  const gridItems = [];
  const $grid = document.querySelector(".productos__grid");
  const $title = document.querySelector(".productos__title");
  const gridItemTemplate = (hash, name, price, index) => {
    return `
      <a href="${hash}" class="item">
          <div class="item__image img-${index}"></div>
          <span class="item__name">${name}</span>
          <span class="item__price">$${price}</span>
      </a>
      `;
  };
  const singleItemTemplate = (title, desc, price, index, stock) => {
    return `
      <div class="single__item">
        <h2 class="single__item__title">${title}</h2>
        <div class="single__item__image img-${index}"></div>
        <p class="single__item__desc">${desc}</p>
        <span class="single__item__price">$${price}</span>
        <div class="single__item__selector">
        <span class="minus">-</span>
        <input type="number" class="selector" value="1" name="amount" min="1" max="${stock}" onKeyDown="return false">
        <span class="plus">+</span>
        </div>
        <a href="" class="single__item__button button-class">Agregar al Carro</a>
      </div>
      `;
  };
  const routes = [{ hash: "", view: () => displayGrid(gridItems) }];
  // fetch response
  json.forEach((e, index) => {
    hash = "#" + titleToHash(e.nombre);
    let item = json[index];
    item["image"] = `assets/items/${e.id}.png`;
    //
    routes.push({ hash, view: () => displayItem(item, index) });
    gridItems.push({
      hash,
      title: e.nombre,
      price: e.precio,
      index,
      image: `assets/items/${e.id}.png`,
      estado: item.estado,
      stock: item.stock,
    });
  });
  // hide loader svg
  document.querySelector(".loader").style.display = "none";

  // execute the router
  hashRouter(routes);

  function displayGrid(gridItems) {
    $grid.innerHTML = "";
    $title.style.display = "block";
    gridItems.forEach((el) => {
      // validar que el producto esté "available" y tenga stock
      if (el.estado === "available" && parseInt(el.stock) > 0) {
        $grid.insertAdjacentHTML(
          "beforeend",
          gridItemTemplate(el.hash, el.title, el.price, el.index)
        );
        document.querySelector(`.img-${el.index}`).style.backgroundImage =
          "url(" + el.image + ")";
      }
    });
  }

  function inputButtons(item, exists) {
    const $minus = document.querySelector(".minus");
    const $plus = document.querySelector(".plus");
    const $input = document.querySelector(".selector");
    const min = parseInt($input.min);
    const max = parseInt($input.max);

    exists.in
      ? ($input.value = amount = exists.cant)
      : (amount = parseInt($input.value));

    const handleMinus = (e) => {
      amount = parseInt($input.value);
      $input.value = amount = amount - 1 < min ? min : amount - 1;
      return false;
    };
    const handlePlus = (e) => {
      amount = parseInt($input.value);
      $input.value = amount = amount + 1 > max ? max : amount + 1;
      return false;
    };

    $minus.addEventListener("click", handleMinus);
    $plus.addEventListener("click", handlePlus);
  }

  function addItem(item, exists) {
    const $add = document.querySelector(".single__item__button");

    const handleAdd = (e) => {
      e.preventDefault();
      exists = existsIt(item, exists);


      // Modifying
      exists.in
        ? (cart[exists.index].amount = amount)
        : cart.push({ amount, item });

      // Saving
      sessionStorage.setItem("cart", JSON.stringify(cart));
      // alert("Producto agregado")
      alertCard("Producto agregado");

      //
      return false;
    };
    $add.addEventListener("click", handleAdd);
  }

  function existsIt(item, exists) {
    cart.forEach((el, index) => {
      if (el.item.id === item.id) {
        exists.in = true;
        exists.cant = el.amount;
        exists.index = index;
      }
    });
    return exists;
  }

  function displayItem(item, index) {
    let exists = { in: false, cant: 0, index };
    exists = existsIt(item, exists);
    // Loading cart

    //
    $grid.innerHTML = "";
    $title.style.display = "none";
    $grid.insertAdjacentHTML(
      "beforeend",
      singleItemTemplate(
        item.nombre,
        item.descripcion,
        item.precio,
        index,
        item.stock
      )
    );
    document.querySelector(`.img-${index}`).style.backgroundImage =
      "url(" + item.image + ")";
    // scroll to top
    window.scrollTo(0, 0);
    // buttons
    inputButtons(item, exists);
    addItem(item, exists);
  }
}
