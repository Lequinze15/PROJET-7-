import { login } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.querySelector("#login form");
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const response = await login(email, password);

      // Si la connexion est réussie, redirection vers index.html
      if (response && response.token) {
        window.location.href = "./index.html"; // Redirection
      }
    } catch (error) {
      // Afficher un message d'erreur en cas d'échec
      alert("Identifiant ou mot de passe incorrect.");
    }
  });
});
