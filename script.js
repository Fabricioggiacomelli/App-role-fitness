const screens = document.querySelectorAll(".screen");
const goButtons = document.querySelectorAll("[data-go]");
const backButtons = document.querySelectorAll("[data-back]");
const nextButtons = document.querySelectorAll(".next-step");
const togglePasswordButtons = document.querySelectorAll("[data-toggle]");
const navItems = document.querySelectorAll(".nav-item");
const tabContents = document.querySelectorAll(".tab-content");

const signupData = {
  name: "",
  birth: "",
  phone: "",
  username: "",
  password: "",
  interests: [],
  city: "",
  neighborhood: ""
};

const fakeFriends = [
  "Lucas",
  "Ana",
  "Rafa",
  "Bruno",
  "Camila",
  "Mariana",
  "João",
  "Pedro",
  "Julia",
  "Bianca"
];

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

  signupData.username = username.startsWith("@") ? username : `@${username}`;
  updateProfileUI();
  showScreen("screen-onboarding-finish");
});

document.getElementById("goToInterestsBtn").addEventListener("click", () => {
  showScreen("screen-interests");
});

document.querySelectorAll(".interest-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("active");
  });
});

document.getElementById("saveInterestsBtn").addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".interest-chip.active")].map(
    item => item.dataset.interest
  );

  if (selected.length === 0) {
    alert("Selecione pelo menos um interesse.");
    return;
  }

  signupData.interests = selected;
  updateProfileUI();
  showScreen("screen-location");
});

document.getElementById("saveLocationBtn").addEventListener("click", () => {
  const city = document.getElementById("signupCity").value.trim();
  const neighborhood = document.getElementById("signupNeighborhood").value.trim();

  if (!city || !neighborhood) {
    alert("Preencha cidade e bairro.");
    return;
  }

  signupData.city = city;
  signupData.neighborhood = neighborhood;
  updateProfileUI();
  showScreen("screen-main-app");
});

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Preencha e-mail e senha.");
    return;
  }

  if (!signupData.name) {
    signupData.name = "Fabrício";
    signupData.username = "@fabriciofit";
    signupData.interests = ["Corrida", "Academia", "Hyrox"];
    signupData.city = "Campinas";
    signupData.neighborhood = "Cambuí";
  }

  updateProfileUI();
  showScreen("screen-main-app");
});

function getInitials(name) {
  if (!name) return "PU";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function updateProfileUI() {
  const name = signupData.name || "Usuário";
  const username = signupData.username || "@usuario";
  const initials = getInitials(name);

  document.getElementById("userGreeting").textContent = name.split(" ")[0];
  document.getElementById("profileName").textContent = name;
  document.getElementById("publishUserName").textContent = name;
  document.getElementById("profileUsername").textContent = username;
  document.getElementById("headerInitials").textContent = initials;
  document.getElementById("profileAvatar").textContent = initials;
  document.getElementById("publishAvatar").textContent = initials;

  const interestsText = signupData.interests.length
    ? signupData.interests.join(", ")
    : "Corrida, academia e performance";

  document.getElementById("heroPersonalization").textContent =
    `${interestsText} perto de você em ${signupData.city || "sua cidade"}.`;

  document.getElementById("profileLocation").textContent =
    signupData.city && signupData.neighborhood
      ? `${signupData.city} • ${signupData.neighborhood}`
      : "Defina sua localização";

  const chipsContainer = document.getElementById("profileChips");
  chipsContainer.innerHTML = "";

  const interests = signupData.interests.length ? signupData.interests : ["Corrida", "Academia"];
  interests.forEach(item => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    chipsContainer.appendChild(chip);
  });
}

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    tabContents.forEach(tab => tab.classList.remove("active"));

    item.classList.add("active");
    document.getElementById(item.dataset.tab).classList.add("active");
  });
});

document.querySelectorAll(".join-btn").forEach(button => {
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

document.querySelectorAll(".invite-btn").forEach(button => {
  button.addEventListener("click", () => {
    const eventCard = button.closest(".event-card");
    const eventName = eventCard.dataset.eventName;
    const friend = fakeFriends[Math.floor(Math.random() * fakeFriends.length)];

    navItems.forEach(i => i.classList.remove("active"));
    tabContents.forEach(tab => tab.classList.remove("active"));
    document.querySelector('[data-tab="tab-chat"]').classList.add("active");
    document.getElementById("tab-chat").classList.add("active");

    document.getElementById("activeChatName").textContent = friend;

    const messages = document.getElementById("chatMessages");
    const bubble = document.createElement("div");
    bubble.className = "bubble bubble-right";
    bubble.textContent = `Me inscrevi em ${eventName}, não quer participar comigo?`;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;

    addChatPreview(friend, `Me inscrevi em ${eventName}, não quer participar comigo?`, "agora");
  });
});

function addChatPreview(name, message, time) {
  const chatList = document.getElementById("chatList");
  const existing = [...chatList.querySelectorAll(".chat-item")].find(
    item => item.dataset.openChat === name
  );

  if (existing) {
    existing.querySelector(".chat-info span").textContent = message;
    existing.querySelector("small").textContent = time;
    return;
  }

  const item = document.createElement("div");
  item.className = "chat-item";
  item.dataset.openChat = name;
  item.innerHTML = `
    <div class="chat-avatar">${name.charAt(0).toUpperCase()}</div>
    <div class="chat-info">
      <strong>${name}</strong>
      <span>${message}</span>
    </div>
    <small>${time}</small>
  `;

  item.addEventListener("click", () => {
    document.getElementById("activeChatName").textContent = name;
  });

  chatList.prepend(item);
}

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

document.getElementById("publishBtn").addEventListener("click", () => {
  const input = document.getElementById("postInput");
  const text = input.value.trim();

  if (!text) {
    alert("Escreva algo para publicar.");
    return;
  }

  const feed = document.getElementById("socialFeed");
  const article = document.createElement("article");
  article.className = "post-card";

  const initials = getInitials(signupData.name || "Usuário");
  const username = signupData.username || "@usuario";
  const name = signupData.name || "Usuário";

  article.innerHTML = `
    <div class="post-head">
      <div class="chat-avatar">${initials}</div>
      <div>
        <strong>${name}</strong>
        <p>${username} • agora</p>
      </div>
    </div>
    <div class="post-body">${text}</div>
    <div class="post-footer">
      <button>❤ 0</button>
      <button>💬 0</button>
      <button>↗ Compartilhar</button>
    </div>
  `;

  feed.prepend(article);
  input.value = "";
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  const confirmLogout = confirm("Deseja sair da conta?");
  if (!confirmLogout) return;

  navItems.forEach(i => i.classList.remove("active"));
  tabContents.forEach(tab => tab.classList.remove("active"));
  document.querySelector('[data-tab="tab-home"]').classList.add("active");
  document.getElementById("tab-home").classList.add("active");

  showScreen("screen-welcome");
});

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

updateProfileUI();