function entrar() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
}

function go(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}