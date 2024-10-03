let btnRegister = document.getElementById("btnRegister");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let inputFirstName = document.getElementById("first_name");
let inputLastName = document.getElementById("last_name");
let inputAge = document.getElementById("age");
let inputRole = document.getElementById("role");

btnRegister.addEventListener("click", async (e) => {
  e.preventDefault();
  if (
    inputEmail.value.trim().length === 0 ||
    inputPassword.value.trim().length === 0
  ) {
    alert("El correo y la contraseña son obligatorias!!!");
    return;
  }

  let body = {
    email: inputEmail.value.trim(),
    password: inputPassword.value.trim(),
    first_name: inputFirstName.value.trim(),
    last_name: inputLastName.value.trim(),
    age: inputAge.value.trim(),
    role: inputRole.value.trim(),
  };

  let respuesta = await fetch("/api/sessions/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  let datos = await respuesta.json();
  if (respuesta.status >= 400) {
    alert(datos.error);
    return;
  }
  alert(
    `Registro exitoso...!!! Bienvenido ${JSON.stringify(
      datos.usuarioRegistrado.full_name
    )}`
  );
  // localStorage.setItem("token", datos.token)
});
/*
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
*/
