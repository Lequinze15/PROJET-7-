import { recuperationCategories} from "./api.js";

export function displayWorks(works) {

    // Sélection de la galerie dans la section portfolio
    const gallery = document.querySelector('#portfolio .gallery');

    // S'assurer que la galerie est vide avant d'ajouter les éléments
    gallery.innerHTML = '';

    // Parcourir chaque work récupéré depuis l'API
    works.forEach(work => {

        // Création de la balise figure
        const figure = document.createElement('figure');

        // Création de l'image pour le work
        
        const image = document.createElement('img');
        image.src = work.imageUrl;  
        image.alt = work.title;     

        // Création de la légende pour le titre
        const legendeImage = document.createElement('legendeImage');
        legendeImage.textContent = work.title;  // Titre du projet

        // Ajouter l'image et la légende à la balise figure
        figure.appendChild(image);
        figure.appendChild(legendeImage);

        // Ajouter la figure à la galerie
        gallery.appendChild(figure);
    });
}

export async function displayCategoriesButtons() {

 const categories = await recuperationCategories();

            // Sélectionner le conteneur des filtres
            const filtersContainer = document.querySelector('.categorie_filtre');
            if (!filtersContainer) {
                console.error('Le conteneur des filtres est introuvable.');
                return;
            }
    
            // Ajouter un bouton "Tous" pour afficher toutes les catégories
            const allButton = document.createElement('button');
            allButton.textContent = 'Tous';
            allButton.id = 'all';
            filtersContainer.appendChild(allButton);

    /* Pour chaque catégorie obtenue, crée un bouton et l'ajoute à un élément avec la classe "container-filtres" */
    categories.forEach((categories) => {
        const btn = document.createElement("button");
        btn.textContent = categories.name;
        btn.id = categories.id;
        filtersContainer.appendChild(btn);
    });
}


