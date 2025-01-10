import { recuperationWorks } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const gallerysupprimer = document.querySelector('#sectionmodale .gallery-modale');

    try {
        const works = await recuperationWorks();

        works.forEach(work => {
            const figure = document.createElement("figure");
            figure.dataset.id = work.id; 

            const img = document.createElement("img");
            img.src = work.imageUrl;

            const deleteIcon = document.createElement("button");
            deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; 
            deleteIcon.classList.add("delete-icon");

            // Fonction suppression

            deleteIcon.addEventListener("click", async () => {
                    await deleteWork(work.id);
                    figure.remove(); 
                    console.log("Projet supprimé avec succès.");
                
            });

            figure.appendChild(img);
            figure.appendChild(deleteIcon); 
            gallerysupprimer.appendChild(figure);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
        alert("Impossible de charger la galerie.");
    }
});

// Fonction suppresion API
async function deleteWork(id) {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("Vous devez être connecté pour supprimer un projet.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression : ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression du projet.");
    }
}