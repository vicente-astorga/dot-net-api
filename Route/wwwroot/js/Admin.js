export default function Admin(admin) {
  const $admin = document.getElementById("nombre-admin");
  $admin.innerHTML = admin;

    const url = "http://localhost:5003/api/Producto";
  //Definición de variables
  const modalArticulo = new bootstrap.Modal(
    document.getElementById("modalArticulo")
  );
  const contenedor = document.querySelector("tbody");
  const formArticulo = document.getElementById("form-articulo");
  // modal sections
  const nombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const precio = document.getElementById("precio");
  const stock = document.getElementById("stock");
  const estado = document.getElementById("select-estado");
  //
  let resultados = "",
    opcion = "";

  btnCrear.addEventListener("click", () => {
    nombre.value = "";
    descripcion.value = "";
    precio.value = "";
    stock.value = "";
    estado.options[0].selected = true;
    modalArticulo.show();
    opcion = "crear";
  });

  btnCerrar.addEventListener("click", () => {
    sessionStorage.setItem("nombre", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("password", "");
    window.location.reload();
  });

  //funcion para mostrar los resultados
  const mostrar = (articulos) => {
    articulos.forEach((articulo) => {
      resultados += ` <tr>
            <td>${articulo.id}</td>
            <td>${articulo.nombre}</td>
            <td>${articulo.descripcion}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.stock}</td>
            <td>${articulo.estado}</td>
            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a></td>
        </tr>
    `;
    });
    contenedor.innerHTML = resultados;
  };

  //Procedimiento Mostrar
  fetch(url)
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch((error) => console.log(error));

  const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };

  // //Procedimiento Borrar  <a class="btnBorrar btn btn-danger">Borrar</a>
  // on(document, "click", ".btnBorrar", (e) => {
  //   const fila = e.target.parentNode.parentNode;
  //   const id = fila.firstElementChild.innerHTML;

  //   if (confirm("¿Eliminar artículo?")) {
  //     fetch(url + id, {
  //       method: "DELETE",
  //     })
  //       .then((res) => res.json())
  //       .then(() => location.reload());
  //   }
  // });

  //Procedimiento Editar
  let idForm = 0;
  on(document, "click", ".btnEditar", (e) => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const nombreForm = fila.children[1].innerHTML;
    const descripcionForm = fila.children[2].innerHTML;
    const precioForm = fila.children[3].innerHTML;
    const stockForm = fila.children[4].innerHTML;
    const estadoForm = fila.children[5].innerHTML;
    //
    nombre.value = nombreForm;
    descripcion.value = descripcionForm;
    precio.value = precioForm;
    stock.value = stockForm;
    estado.value = estadoForm;
    // console.dir(estado)
    opcion = "editar";
    modalArticulo.show();
  });

  //Procedimiento para Crear y Editar
  document.getElementById("guardar").addEventListener("click", (e) => {
    e.preventDefault();
    if (opcion == "crear") {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre.value,
          descripcion: descripcion.value,
          precio: precio.value,
          stock: stock.value,
          estado: estado.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const nuevoArticulo = [];
          nuevoArticulo.push(data);
          mostrar(nuevoArticulo);
        });
    }
    if (opcion == "editar") {
      console.log("OPCION EDITAR");
      fetch(url + "/" + idForm, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
          id: idForm,
          nombre: nombre.value,
          descripcion: descripcion.value,
          precio: precio.value,
          stock: stock.value,
          estado: estado.value,
        }),
      }).then(() => location.reload());
    }
    modalArticulo.hide();
  });
}
