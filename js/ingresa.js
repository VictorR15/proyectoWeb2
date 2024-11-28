const formulario = document.querySelector(".entradas");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  //Variables para obtener la info
  const correo = document.querySelector(".entradas__correo").value;
  const password = document.querySelector(".entradas__password").value;
  const Users = JSON.parse(localStorage.getItem("users")) || [];
  const validarUser = Users.find(
    (user) => user.correo === correo && user.password === password
  );
  if (!validarUser) {
    return alert("Usuario o contraseña incorrecta");
  }
  alert(`Bienvenido ${validarUser.name}`);
  window.location.href = "index.html";
});
