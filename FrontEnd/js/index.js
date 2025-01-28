import { recuperationWorks, recuperationCategories } from "./api.js";
import { displayWorks, displayCategoriesButtons, loginAffichageWorks, loginHeader, loginBarreNoire } from "./display.js";

export async function affichageWorksDefaut() {
  try {
    // Appel à l'API pour récupérer les *works*
    const works = await recuperationWorks();

    // Affichage des *works* dans la page
    displayWorks(works);
  } catch (error) {
    console.error("Une erreur est survenue lors du chargement des projets", error);

    const gallery = document.querySelector("#portfolio .gallery");
  }
}

 
// Modale 1
const modal = document.getElementById('myModal');
const closeModal = document.querySelector('.close');

// Ouverture
window.openModal = function () { 
    modal.style.display = 'block';
};

// Fermeture
window.closeModalHandler = function () {
    modal.style.display = 'none';
};

closeModal.addEventListener('click', () => {
    closeModalHandler();
});

// Fin Modale 1

// Modale 2
const modal2 = document.getElementById('myModal2');
const closeModal2 = document.querySelector('.close2');

// Ouverture
window.openModal2 = function () { 
    chargementCategoriesModale2(); // Charger les catégories dynamiques
    modal2.style.display = 'block';
};

// Fermeture
window.closeModal2Handler = function () {
    modal2.style.display = 'none';
};

closeModal2.addEventListener('click', () => {
    closeModal2Handler();
});

// Fin Modale 2

// Gestion de la galerie dans la modale 1 
async function chargementGalerieModale() {
    const gallerysupprimer = document.querySelector('#sectionmodale .gallery-modale');
    if (!gallerysupprimer) {
        console.error("La galerie modale n'existe pas.");
        return;
    }

    // Vider la galerie avant de la recharger
    gallerysupprimer.innerHTML = '';

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
}

// Fonction suppression API
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
        affichageWorksDefaut();
        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression du projet.");
    }
  
}

// Modale 2
function fonctionAjoutProjet() {
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

                // Réinitialiser le formulaire
                ajoutprojetForm.reset();

                // Rafraîchir la galerie principale et celle de la modale
                affichageWorksDefaut();
                if (typeof chargementGalerieModale === "function") {
                    await chargementGalerieModale();
                } else {
                    console.warn("La fonction chargementGalerieModale n'est pas définie.");
                }
            } else {
                console.error("Erreur lors de l'ajout :", response.status, response.statusText);
                console.error("Réponse du serveur :", responseText);
            }
        } catch (error) {
            console.error("Erreur réseau ou serveur :", error);
        }
    });
}

async function chargementCategoriesModale2() {
    try {
        const categories = await recuperationCategories();
        const categorySelect = document.querySelector('#categoryId');

        if (!categorySelect) {
            console.error("Le champ de sélection de catégorie est introuvable.");
            return;
        }

        // Vider les options existantes
        categorySelect.innerHTML = '<option value=""></option>';

        // Ajouter les options dynamiquement
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des catégories pour la modale 2 :", error);
    }
}

// Appel des fonctions principales
fonctionAjoutProjet();
chargementGalerieModale();
affichageWorksDefaut();
displayCategoriesButtons();
loginHeader();
loginAffichageWorks();
loginBarreNoire();
chargementCategoriesModale2();
