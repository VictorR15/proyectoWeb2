const formulario = document.querySelector(".entradas");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  //Variables Formulario
  const name = document.querySelector(".entradas__nombre").value;
  const correo = document.querySelector(".entradas__correo").value;
  const password = document.querySelector(".entradas__password").value;

  const Users = JSON.parse(localStorage.getItem("users")) || [];

  const usuarioRegistrado = Users.find((user) => user.correo === correo);
  if (usuarioRegistrado) {
    return alert("El usuario ya esta registrado ");
  }

  Users.push({ name: name, correo: correo, password: password });
  localStorage.setItem("users", JSON.stringify(Users));
  alert("Registro Exitoso");
  window.location.href = "ingresa.html";
});
