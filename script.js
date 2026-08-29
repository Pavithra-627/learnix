const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const nameInput = document.getElementById("nameInput");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => nav.classList.toggle("open"));

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  nav.classList.remove("open");
}

function openModal() {
  modalTitle.textContent = "Welcome to Learnix ✨";
  modalText.textContent = "Create your student profile to start exploring Learnix.";
  nameInput.value = localStorage.getItem("learnixName") || "";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  setTimeout(() => nameInput.focus(), 50);
}

function openTutor() {
  modalTitle.textContent = "AI Tutor 🤖";
  modalText.textContent = "The AI Tutor interface is ready for the next development stage. Enter your name to continue.";
  nameInput.value = localStorage.getItem("learnixName") || "";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}

function openFeature(feature) {
  modalTitle.textContent = feature;
  modalText.textContent = `${feature} is part of Learnix. This website version provides the interface; AI, accounts and data features can be connected next.`;
  nameInput.value = localStorage.getItem("learnixName") || "";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}

function continueAction() {
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem("learnixName", name);
    modalTitle.textContent = `Welcome, ${name}! 🎉`;
    modalText.textContent = "Your Learnix profile has been saved on this browser. Explore the Study, Skills and Career sections.";
    nameInput.style.display = "none";
    document.querySelector(".modal-box .primary").textContent = "Start Learning →";
    document.querySelector(".modal-box .primary").onclick = () => {
      closeModal();
      scrollToSection("study");
    };
  } else {
    nameInput.focus();
    nameInput.placeholder = "Please enter your name";
  }
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  nameInput.style.display = "block";
  document.querySelector(".modal-box .primary").textContent = "Continue →";
  document.querySelector(".modal-box .primary").onclick = continueAction;
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
