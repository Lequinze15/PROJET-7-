// Importation des fonctions depuis différents fichiers
import { recoveryWorks } from "./api.js"; // Fonction pour récupérer les "works" depuis une API
import { 
    displayWorks, 
    displayCategoriesButtons, 
    loginDisplayWorks, 
    loginHeader, 
    loginBlackBar 
} from "./display.js"; // Fonctions liées à l'affichage des éléments sur la page

import { 
    initModal1, 
    initModal2, 
    loadingModalGallery, 
    deleteWork, 
    addWorksFunction, 
    loadingCategoriesModalGallery2, 
    imagePreview 
} from "./modal.js"; // Fonctions liées aux modales et aux actions associées

//Cette fonction récupère les works depuis l'API et les affiche sur la page.
export async function defaultWorkDisplay() {
    try {
        // Récupération des works via l'API
        const works = await recoveryWorks();

        // Affichage des works sur la page
        displayWorks(works);
    } catch (error) {
        // Gestion des erreurs en cas d'échec de récupération des works
        console.error("Une erreur est survenue lors du chargement des projets", error);
    }
}

// ** Appel des fonctions principales **
// Chargement et affichage des works par défaut sur la page principale
defaultWorkDisplay();
// Affichage des boutons de catégories 
displayCategoriesButtons();
// Mise à jour de l'affichage du header en fonction de l'état de connexion
loginHeader();
// Affichage des projets en mode connecté 
loginDisplayWorks();
// Affichage de la barre noire d'administration si l'utilisateur est connecté
loginBlackBar();
// Initialisation de la première modale 
initModal1();
// Chargement de la galerie de la modale
loadingModalGallery();
// Suppression d'un work
deleteWork();
// Initialisation de la deuxième modale 
initModal2();
// Fonction pour ajouter un work
addWorksFunction();
// Gestion de la prévisualisation d'une image lors de l'ajout d'un work
imagePreview();
// Chargement des catégories dans la modale d'ajout de work
loadingCategoriesModalGallery2();

