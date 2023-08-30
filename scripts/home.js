"use strict";
const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const welcomeMessage = document.querySelector("#welcome-message");
const btnLogout = document.querySelector("#btn-logout");
btnLogout.style.display = "none";
function displayHome() {
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${userActive.firstname}`;
    btnLogout.style.display = "block";
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Are you sure you log out ?");
  if (isLogout) {
    userActive = undefined;
    saveToStorage("userActive", userActive);
    displayHome();
  }
});
displayHome();
//API key = d397e852c3d84c2e8e3f16a094c4b268
