import {recuperationWorks } from "./api.js";
import { displayWorks, displayCategoriesButtons } from './display.js';

async function fonctionDisplayWorks() {
    try {
        // Appel à l'API pour récupérer les *works*
        const works = await recuperationWorks();

        // Affichage des *works* dans la page
        displayWorks(works);
    } catch (error) {
        console.error('Une erreur est survenue lors du chargement des projets', error);

        const gallery = document.querySelector('#portfolio .gallery');
        
    }
}

// Appel des fonctions

fonctionDisplayWorks();

displayCategoriesButtons();