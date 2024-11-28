/* ERREUR import {recuperationLogin} from "./api.js"; */

document.addEventListener("DOMContentLoaded", () => {

    const emailenregistrerEmail = localStorage.getItem("email");
    const passwordenregistrer = localStorage.getItem("password");

    if (emailenregistrerEmail && passwordenregistrer) {
        console.log("Données récupérées du localStorage :");
        console.log("Email:", emailenregistrerEmail);
        console.log("Password:", passwordenregistrer);

    }
    const form = document.querySelector("#login form");

    // Ajout evenement
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

    
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

 
       console.log("Email:", email);
       console.log("Password:", password);

       localStorage.setItem("email", email);
       localStorage.setItem("password", password);

       const storedEmail = localStorage.getItem("email");
       const storedPassword = localStorage.getItem("password");

       console.log("Email:", storedEmail);
       console.log("Password:", storedPassword);
     
        });})
