import Admin from "./Admin.js";

export default function LogIn() {
  const url = "http://localhost:5003/api/Vendedor";
  //Procedimiento Mostrar
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLogIn(data))
    .catch((error) => console.log(error));

  function displayLogIn(data) {

    const sesionNombre = sessionStorage.getItem('nombre');
    const sesionEmail = sessionStorage.getItem('email');
    const sesionPassword = sessionStorage.getItem('password');
    let match = false;

    if(sesionEmail && sesionPassword){
      data.forEach((el) => {
        if (
          el.emailVendedor === sesionEmail &&
          el.password === sesionPassword
        ) {
          // entró 
          match = true;
        } 
      });
      if(match){
        setup(sesionNombre)
      }else{
        alert("credenciales incorrectas")
        sessionStorage.setItem('nombre', '');
        sessionStorage.setItem('email', '');
        sessionStorage.setItem('password', '');
        window.location.reload();
      }
    }else{
      // los valores no existen o no concuerdan
      document.querySelector("main").innerHTML = `
        <form class="login-form gap-2 col-6 mx-auto shadow-lg p-3 my-5 bg-body rounded">
            <h1>Iniciar Sesión</h1>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input required type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input required type="password" class="form-control" id="inputPassword">
            </div>
            <button type="submit" class="btn btn-primary">Ingresar</button>
        </form>
        `;
        const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
        const $form = document.querySelector(".login-form");
        $form.addEventListener("submit", (e) => {
          e.preventDefault();
    
          data.forEach((el) => {
            if (
              el.emailVendedor === email.value &&
              el.password === password.value
            ) {
              sessionStorage.setItem('nombre', el.nombreVendedor);
              sessionStorage.setItem('email', el.emailVendedor);
              sessionStorage.setItem('password', el.password);
              match = true;
            }
          });
          if(!match){
            alert("credenciales incorrectas2")
          }else{
            const sesionNombre = sessionStorage.getItem('nombre');
            setup(sesionNombre);
          }
        });
    }
    
    function setup(vendedor){
        document.querySelector("main").innerHTML = `
        <div class="d-grid gap-2 col-10 mx-auto shadow-lg p-3 my-5 bg-body rounded">       
      <h2 class="text-center">Administrador: <span id="nombre-admin"></span></h2> 
        <button id="btnCrear" type="button" class="btn btn-primary btn-lg mx-auto" data-bs-toggle="modal"  data-bs-target="#modalArticulo">Crear</button>
        <button id="btnCerrar" type="button" class="btn btn-primary btn-lg mx-auto" >Cerrar Sesión</button>
        <table id="tablaArticulos" class="table mt-2 table-bordered table-striped">
            <thead>
                <tr class="text-center">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>                
            </tbody>
        </table>
    </div>

<div id="modalArticulo" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="exampleModalLabel">Articulo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="form-articulo">
          <div class="mb-3">
            <label for="nombre" class="col-form-label">Nombre:</label>
            <input id="nombre" type="text" class="form-control" autofocus>
          </div>
          <div class="mb-3">
            <label for="descripcion" class="col-form-label">Descripción:</label>
            <input id="descripcion" type="text" class="form-control" autofocus>
          </div>
          <div class="mb-3">
            <label for="precio" class="col-form-label">Precio</label>
            <input id="precio" type="number" class="form-control">
          </div>
          <div class="mb-3">
            <label for="stock" class="col-form-label">Stock</label>
            <input id="stock" type="number" class="form-control">
          </div>      
          <div class="mb-3">
            <label for="estado" class="col-form-label">Estado</label>
            <select id="select-estado" class="form-select form-select-sm" aria-label=".form-select-sm example">
              <option selected disabled>Selecciona</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div> 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="guardar">Guardar</button>
      </div>
    </form>
    </div>
  </div>
</div>
        `
        Admin(vendedor);
    }

  }
}
