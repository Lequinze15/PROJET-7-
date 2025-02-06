// Importation des fonctions depuis différents fichiers

import { login } from "./api.js";

// Fonction d'initialisation de la connexion
function initLogin() {
    // Attente du chargement complet du DOM avant d'exécuter le script
    document.addEventListener("DOMContentLoaded", () => {
        // Sélection du formulaire de connexion
        const form = document.querySelector("#login form");

        // Vérification de l'existence du formulaire
        if (!form) {
            console.error("Le formulaire de connexion n'a pas été trouvé.");
            return;
        }

        // Ajout d'un écouteur d'événements sur la soumission du formulaire
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Empêche le rechargement de la page

            // Récupération des valeurs des champs email et mot de passe
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            try {
                // Appel de la fonction login pour tenter de se connecter
                const response = await login(email, password);

                // Vérification si le token est bien reçu après connexion réussie
                if (response && response.token) {
                    window.location.href = "./index.html"; // Redirection vers la page d'accueil
                } else {
                    console.warn("Aucun token trouvé dans la réponse.");
                }
            } catch (error) {
                // Affichage d'un message en cas d'erreur d'authentification
                console.log("Identifiant ou mot de passe incorrect.");
            }
        });
    });
}

initLogin();