export default function responsiveNavbar(match, routes, routerCallback) {
  // avoid display=false routes
  if (!match.route.display) {
    return;
  }
  const newRoutes = [];
  routes.forEach((el) => {
    if (el.display) {
      newRoutes.push(el);
    }
  });
  routes = newRoutes;

  // VAR AND TEMPLATE DEFINITION
  let selectedItem = match.index;
  const $menuMobile = document.querySelector(".navbar__menu-mobile");
  const $menuDesktop = document.querySelector(".navbar__menu-desktop");
  const linksGroup = routes
    .map((el) => {
      return `<a href=${el.path}><span class="">${el.name}</span></a>`;
    })
    .join("");
  const linksTemplate = (target) => `
      <div class=${target}>
          ${linksGroup}
      </div>
      `;

  // SETTING UP
  appendMenu();
  window.addEventListener("resize", appendMenu, true);

  //
  function appendMenu() {
    $menuDesktop.innerHTML = "";
    $menuMobile.innerHTML = "";
    // ask display width
    if (window.matchMedia("(min-width: 900px)").matches) {
      $menuDesktop.insertAdjacentHTML(
        "beforeend",
        linksTemplate("header-menu")
      );
      linkSelection("header-menu");
    } else {
      $menuMobile.innerHTML = `
        <input type="checkbox" />
        <img class="button" src="assets/plus.png" alt="plus" />
        `;
      $menuMobile.insertAdjacentHTML("beforeend", linksTemplate("side-menu"));
      linkSelection("side-menu");
    }
  }
  //
  function linkSelection(target) {
    const $links = document.querySelector("." + target).children;
    // adding ".selected" class to the selected item
    Array.from($links)[selectedItem].children[0].classList.add("selected");
    Array.from($links).forEach((element, index) => {
      element.addEventListener("click", async () => {
        // callback
        const newMatch = await routerCallback;
        Array.from($links)[selectedItem].children[0].classList.remove(
          "selected"
        );
        selectedItem = newMatch.index;
        Array.from($links)[selectedItem].children[0].classList.add("selected");
      });
      //
    });
  }
  //
}
