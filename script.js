const screens = document.querySelectorAll(".screen");
const goButtons = document.querySelectorAll("[data-go]");
const backButtons = document.querySelectorAll("[data-back]");
const nextButtons = document.querySelectorAll(".next-step");
const togglePasswordButtons = document.querySelectorAll("[data-toggle]");
const navItems = document.querySelectorAll(".nav-item");
const tabContents = document.querySelectorAll(".tab-content");
const joinButtons = document.querySelectorAll(".join-btn");

const signupData = {
  name: "",
  birth: "",
  phone: "",
  username: "",
  password: ""
};

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

goButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.go);
  });
});

backButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.back);
  });
});

togglePasswordButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.toggle);
    if (!input) return;

    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "Ocultar";
    } else {
      input.type = "password";
      btn.textContent = "Mostrar";
    }
  });
});

function isStrongPassword(password) {
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return hasLength && hasUpper && hasNumber && hasSpecial;
}

nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const currentScreen = btn.closest(".screen").id;
    const nextScreen = btn.dataset.next;

    if (currentScreen === "screen-signup-step1") {
      const name = document.getElementById("signupName").value.trim();
      if (name.length < 3) {
        alert("Digite seu nome completo.");
        return;
      }
      signupData.name = name;
    }

    if (currentScreen === "screen-signup-step2") {
      const birth = document.getElementById("signupBirth").value.trim();
      if (birth.length < 10) {
        alert("Digite sua data de nascimento.");
        return;
      }
      signupData.birth = birth;
    }

    if (currentScreen === "screen-signup-step3") {
      const phone = document.getElementById("signupPhone").value.trim();
      if (phone.length < 14) {
        alert("Digite um telefone válido.");
        return;
      }
      signupData.phone = phone;
    }

    if (currentScreen === "screen-signup-step4") {
      const otpInputs = [...document.querySelectorAll(".otp")];
      const code = otpInputs.map(input => input.value).join("");
      if (code.length < 4) {
        alert("Digite o código de 4 dígitos.");
        return;
      }
    }

    if (currentScreen === "screen-signup-step5") {
      const password = document.getElementById("signupPassword").value;
      const passwordConfirm = document.getElementById("signupPasswordConfirm").value;

      if (!isStrongPassword(password)) {
        alert("Sua senha precisa ter 8 caracteres, 1 número, 1 caractere especial e 1 letra maiúscula.");
        return;
      }

      if (password !== passwordConfirm) {
        alert("As senhas não conferem.");
        return;
      }

      signupData.password = password;
    }

    showScreen(nextScreen);
  });
});

document.getElementById("finishSignupBtn").addEventListener("click", () => {
  const username = document.getElementById("signupUsername").value.trim();

  if (username.length < 3) {
    alert("Digite um nome de usuário válido.");
    return;
  }

  signupData.username = username;

  document.getElementById("userGreeting").textContent = signupData.name || "Usuário";
  document.getElementById("profileName").textContent = signupData.name || "Usuário";

  showScreen("screen-onboarding-finish");
});

document.getElementById("goToAppBtn").addEventListener("click", () => {
  showScreen("screen-main-app");
});

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Preencha e-mail e senha.");
    return;
  }

  showScreen("screen-main-app");
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    tabContents.forEach(tab => tab.classList.remove("active"));

    item.classList.add("active");
    document.getElementById(item.dataset.tab).classList.add("active");
  });
});

joinButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.textContent === "Participar") {
      button.textContent = "Confirmado";
      button.style.opacity = "0.85";
    } else {
      button.textContent = "Participar";
      button.style.opacity = "1";
    }
  });
});

document.querySelectorAll(".chat-item").forEach(item => {
  item.addEventListener("click", () => {
    const chatName = item.dataset.openChat;
    document.getElementById("activeChatName").textContent = chatName;
  });
});

document.getElementById("sendMessageBtn").addEventListener("click", sendMessage);
document.getElementById("chatInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("chatInput");
  const value = input.value.trim();
  if (!value) return;

  const bubble = document.createElement("div");
  bubble.className = "bubble bubble-right";
  bubble.textContent = value;

  const messages = document.getElementById("chatMessages");
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  input.value = "";
}

document.getElementById("signupBirth").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 8);
  if (v.length > 4) v = `${v.slice(0, 2)} / ${v.slice(2, 4)} / ${v.slice(4)}`;
  else if (v.length > 2) v = `${v.slice(0, 2)} / ${v.slice(2)}`;
  e.target.value = v;
});

document.getElementById("signupPhone").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 11);

  if (v.length > 6) {
    v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  } else if (v.length > 2) {
    v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  }

  e.target.value = v;
});

const otpInputs = document.querySelectorAll(".otp");
otpInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && otpInputs[index + 1]) {
      otpInputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && otpInputs[index - 1]) {
      otpInputs[index - 1].focus();
    }
  });
});