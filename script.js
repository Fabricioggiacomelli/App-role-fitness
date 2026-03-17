function entrar() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
}

function trocar(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tab).classList.add("active");

  document.getElementById("title").innerText = 
    tab === "home" ? "Início" :
    tab === "mapa" ? "Mapa" :
    tab === "chat" ? "Chat" : "Perfil";
}

function participar(btn) {
  btn.innerText = "Confirmado ✅";
  btn.style.background = "#555";
}

function enviar() {
  const msg = document.getElementById("msg").value;
  if (!msg) return;

  const div = document.createElement("div");
  div.className = "msg";
  div.innerText = msg;

  document.getElementById("chatBox").appendChild(div);
  document.getElementById("msg").value = "";
}