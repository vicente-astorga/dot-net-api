export default async function alertCard(input) {
    //delete old aletrs
  var oldAlert = document.querySelectorAll(".alert__card");
  Array.from(oldAlert).forEach((div) => div.remove());

  const alertTemplate = `
          <div class="alert__card">
            <span class="alert__card__text">${input}</span>
          </div>
          `;

  document.body.insertAdjacentHTML("beforeend", alertTemplate);
  const $alert = document.querySelector(".alert__card");

  setTimeout(() => {
    $alert.remove();
  }, 2000)
  
}
