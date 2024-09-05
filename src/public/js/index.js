let btnSubmit = document.getElementById("btnSubmit");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");

btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  if (
    inputEmail.value.trim().length === 0 ||
    inputPassword.value.trim().length === 0
  ) {
    alert("Complete los datos...!!!");
    return;
  }

  let body = {
    email: inputEmail.value.trim(),
    password: inputPassword.value.trim(),
  };

  let respuesta = await fetch("/api/sessions/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  let datos = await respuesta.json();
  console.log(datos);
  /*if (respuesta.status >= 400) {
    alert(datos.error);
    return;
  }
  alert(`Login exitoso...!!! ${JSON.stringify(datos.usuarioLogueado)}`);
*/

  if (respuesta.ok) {
    alert(datos.payload); // Muestra la alerta con el mensaje
    window.location.href = "/api/sessions/usuario"; // Redirige a la página deseada
  } else {
    alert(datos.error);
    return; // Maneja errores
  }

  // localStorage.setItem("token", datos.token)
});

let divDatos = document.getElementById("datos");
let btnDatos = document.getElementById("btnDatos");
btnDatos.addEventListener("click", async (e) => {
  let respuesta = await fetch("/api/sessions/usuario", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  try {
    let datos = await respuesta.json();
    console.log(datos);
    divDatos.textContent = JSON.stringify(datos, null, 5);
  } catch (error) {
    divDatos.textContent = "Error...!!!";
  }
});
