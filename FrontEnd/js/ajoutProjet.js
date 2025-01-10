export function ajoutProjets() {
    document.addEventListener("DOMContentLoaded", function () {
        const ajoutprojetForm = document.querySelector(".nouveauProjet");
        if (!ajoutprojetForm) {
            console.error("Le formulaire avec la classe 'nouveauProjet' est introuvable.");
            return;
        }
        
        ajoutprojetForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const titleField = event.target.querySelector("[name=title]");
            const imageUrlField = event.target.querySelector("[name=imageUrl]");
            const categoryIdField = event.target.querySelector("[name=categoryId]");

            if (!titleField || !imageUrlField || !categoryIdField) {
                console.error("Un ou plusieurs champs sont introuvables.");
                return;
            }

            const categoryIdValue = categoryIdField.value;

            const formData = new FormData();
            formData.append("image", imageUrlField.files[0]); 
            formData.append("title", titleField.value);
            // erreur car envoi categoryId au lieu de category , resolu gracce à chatgpt
            formData.append("category", parseInt(categoryIdValue, 10)); 

            console.log("Données envoyées :", [...formData.entries()]);

            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("Vous devez être connecté pour ajouter un projet.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                });

                const responseText = await response.text();
                console.log("Réponse brute du serveur :", responseText);

                if (response.ok) {
                    const data = JSON.parse(responseText);
                    console.log("Projet ajouté :", data);
                    ajoutprojetForm.reset();
                    console.log("Remise à zéro du formulaire");
                } else {
                    console.error("Erreur lors de l'ajout :", response.status, response.statusText);
                    console.error("Réponse du serveur :", responseText);
                }
            } catch (error) {
                console.error("Erreur réseau ou serveur :", error);
            }
        });
    });
}

ajoutProjets();