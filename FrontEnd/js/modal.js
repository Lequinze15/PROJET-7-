// Importation des fonctions depuis différents fichiers

import { recoveryWorks, recoveryCategories } from "./api.js";
import { defaultWorkDisplay } from "./index.js";

// Fonctione d' initialisation de la modale 1
export function initModal1() {
    // Récupération des éléments
    const modal = document.getElementById('myModal');
    const closeModal = document.querySelector('.close');

    if (!modal || !closeModal) {
        console.error("Les éléments de la modale ne sont pas trouvés.");
        return;
    }

    // Fonction d'ouverture
    window.openModal = function () { 
        modal.style.display = 'block';
    };

    // Fonction de fermeture
    window.closeModalHandler = function () {
        modal.style.display = 'none';
    };

    // Ajout de l'événement de fermeture sur le bouton
    closeModal.addEventListener('click', closeModalHandler);
}
// Fonction d' initialisation de la modale 2
export function initModal2() {
    // Récupération des éléments
    const modal2 = document.getElementById('myModal2');
    const closeModal2 = document.querySelector('.close2');
    const backButton = document.querySelector('.back-button');

    if (!modal2 || !closeModal2 || !backButton) {
        console.error("Les éléments de la modale 2 ne sont pas trouvés.");
        return;
    }

    // Fonction d'ouverture
    window.openModal2 = function () { 
        loadingCategoriesModalGallery2(); 
        modal2.style.display = 'block';
    };

    // Fonction de fermeture
    window.closeModal2Handler = function () {
        modal2.style.display = 'none';
    };

    // Ajout des événements de fermeture
    closeModal2.addEventListener('click', closeModal2Handler);
    backButton.addEventListener('click', closeModal2Handler);
}

// Modale 1
// Gestion de la galerie dans la modale 1 
export async function loadingModalGallery() {
    // Sélectionne l'élément de la galerie dans la modale
    const gallerysupprimer = document.querySelector('#sectionmodale .gallery-modale');
    
    // Vérifie si l'élément existe
    if (!gallerysupprimer) {
        console.error("La galerie modale n'existe pas.");
        return;
    }

    // Vider la galerie avant de la recharger pour éviter les doublons
    gallerysupprimer.innerHTML = '';

    try {
        // Récupération des works 
        const works = await recoveryWorks();

        // Boucle à travers chaque works récupéré
        works.forEach(work => {
            // Création d'un élément figure pour chaque travail
            const figure = document.createElement("figure");
            figure.dataset.id = work.id; // Attribution d'un identifiant de données

            // Création de l'élément image et définition de sa source
            const img = document.createElement("img");
            img.src = work.imageUrl;

            // Création du bouton de suppression avec icône
            const deleteIcon = document.createElement("button");
            deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            deleteIcon.classList.add("delete-icon");

            // Ajout d'un écouteur d'événements pour la suppression d'un work
            deleteIcon.addEventListener("click", async () => {
                await deleteWork(work.id); // Suppression du work
                figure.remove(); // Suppression de l'élément visuel
                console.log("Projet supprimé avec succès.");
            });

            // Ajout des éléments créés à la figure
            figure.appendChild(img);
            figure.appendChild(deleteIcon);

            // Ajout de la figure à la galerie modale
            gallerysupprimer.appendChild(figure);
        });
    } catch (error) {
        // Gestion des erreurs en cas d'échec du chargement des projets
        console.error("Erreur lors du chargement des projets :", error);
        alert("Impossible de charger la galerie.");
    }
}
// Fonction suppression work
export async function deleteWork(id) {
    // Récupération du token d'authentification depuis le stockage local
    const token = localStorage.getItem("authToken");
    
    // Vérification de la présence du token, nécessaire pour l'authentification
    if (!token) {
        console.error("Vous devez être connecté pour supprimer un projet.");
        return;
    }

    try {
        // Envoi d'une requête DELETE à l'API pour supprimer le work correspondant à l'ID fourni
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` // Ajout du token dans l'en-tête pour authentification
            }
        });

        // Vérification de la réponse de l'API
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression : ${response.status}`);
        }
        
        // Rafraîchissement de l'affichage après la suppression
        defaultWorkDisplay();
        return true;
    } catch (error) {
        // Gestion des erreurs et affichage des messages correspondants
        console.error("Erreur lors de la suppression :", error);
        console.error("Une erreur est survenue lors de la suppression du projet.");
    }
}

// Modale 2
// Fonction d'ajout d'un work
export function addWorksFunction() {
    // Sélection du formulaire d'ajout de projet
    const ajoutprojetForm = document.querySelector(".nouveauProjet");
    
    // Vérification de l'existence du formulaire
    if (!ajoutprojetForm) {
        console.error("Le formulaire avec la classe 'nouveauProjet' est introuvable.");
        return;
    }
    
    // Ajout d'un écouteur d'événements pour la soumission du formulaire
    ajoutprojetForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupération des champs du formulaire
        const titleField = event.target.querySelector("[name=title]");
        const imageUrlField = event.target.querySelector("[name=imageUrl]");
        const categoryIdField = event.target.querySelector("[name=categoryId]");

        // Vérification de la présence des champs
        if (!titleField || !imageUrlField || !categoryIdField) {
            console.error("Un ou plusieurs champs sont introuvables.");
            return;
        }

        // Récupération de la valeur de l'ID de la catégorie
        const categoryIdValue = categoryIdField.value;

        // Création de l'objet FormData pour envoyer les données du projet
        const formData = new FormData();
        formData.append("image", imageUrlField.files[0]); 
        formData.append("title", titleField.value);
        formData.append("category", parseInt(categoryIdValue, 10)); 

        console.log("Données envoyées :", [...formData.entries()]);

        // Récupération du token d'authentification
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("Vous devez être connecté pour ajouter un projet.");
            return;
        }

        try {
            // Envoi des données au serveur via une requête POST
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            const responseText = await response.text();
            console.log("Réponse brute du serveur :", responseText);

            // Vérification de la réponse du serveur
            if (response.ok) {
                const data = JSON.parse(responseText);
                console.log("Projet ajouté :", data);

                // Réinitialisation du formulaire après ajout réussi
                ajoutprojetForm.reset();

                // Rafraîchir la galerie principale et celle de la modale
                defaultWorkDisplay();
                if (typeof loadingModalGallery === "function") {
                    await loadingModalGallery();
                } else {
                    console.warn("La fonction loadingModalGallery n'est pas définie.");
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
// Fonction de chargement des catégories pour la modale 2
export async function loadingCategoriesModalGallery2() {
    try {
        // Récupération des catégories 
        const categories = await recoveryCategories();
        
        // Sélection de l'élément de sélection des catégories
        const categorySelect = document.querySelector('#categoryId');

        // Vérification de l'existence du champ de sélection
        if (!categorySelect) {
            console.error("Le champ de sélection de catégorie est introuvable.");
            return;
        }

        // Vider les options existantes
        categorySelect.innerHTML = '<option value=""></option>';

        // Ajout dynamique des catégories sous forme d'options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        // Gestion des erreurs lors de la récupération des catégories
        console.error("Erreur lors du chargement des catégories pour la modale 2 :", error);
    }
}
// Fonction de prévisualisation de l'image avant ajout du work
export function imagePreview() {
    // Sélection des éléments HTML liés à l'image
    const imageInput = document.getElementById("image");
    const imagePreview = document.getElementById("image-preview");
    const imageLabel = document.querySelector(".image-label");
    const smallText = document.querySelector("small");
    const ajoutprojetForm = document.querySelector(".nouveauProjet");

    // Création d'un conteneur pour afficher l'image sélectionnée
    const imageSelected = document.createElement("div");
    imageSelected.classList.add("image-selected");
    imageSelected.style.display = "none"; // Caché par défaut

    // Création de l'élément image à l'intérieur du conteneur
    const selectedImg = document.createElement("img");
    imageSelected.appendChild(selectedImg);

    // Insérer l'affichage d'image après le label de l'image
    imageLabel.parentNode.insertBefore(imageSelected, imageLabel.nextSibling);

    // Écouteur d'événement sur l'input file pour détecter un changement d'image
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            console.log(" Image sélectionnée :", file.name);
            
            const reader = new FileReader();

            // Chargement et affichage de l'aperçu de l'image sélectionnée
            reader.onload = function (e) {
                selectedImg.src = e.target.result;
                imagePreview.src = e.target.result;
            };

            reader.readAsDataURL(file);

            // Masquer le label et le texte explicatif
            imageLabel.style.display = "none";
            smallText.style.display = "none";

            // Afficher l'image sélectionnée
            imageSelected.style.display = "block";
            console.log("Affichage de l'image prévisualisée");
        }
    });

    // Réinitialisation du formulaire après soumission
    ajoutprojetForm.addEventListener("submit", function () {
        console.log("Ajout d'un projet en cours");

        // Réinitialisation de l'input et de l'aperçu de l'image
        imageInput.value = "";
        imagePreview.src = "";

        // Réafficher le label et le texte explicatif
        imageLabel.style.display = "block";
        smallText.style.display = "block";

        // Masquer l'aperçu de l'image sélectionnée
        imageSelected.style.display = "none";

        // Réinitialisation complète du formulaire
        ajoutprojetForm.reset();
        console.log("Réinitialisation du formulaire complétée");
    });
}
