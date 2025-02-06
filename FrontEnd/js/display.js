// Importation des fonctions depuis différents fichiers

import { recoveryCategories, recoveryWorks} from "./api.js";

// Fonction pour afficher la liste des works 
export function displayWorks(works) {

  // Sélection de la galerie dans la section portfolio
  const gallery = document.querySelector('#portfolio .gallery');

  // Vérification si la galerie est bien trouvée dans le DOM
  if (!gallery) {
      console.error("Élément 'gallery' introuvable !");
      return;
  }

  // S'assurer que la galerie est vide avant d'ajouter les nouveaux éléments
  gallery.innerHTML = '';

  // Parcourir chaque work récupéré depuis l'API
  works.forEach(work => {

      // Création d'une balise <figure> pour contenir chaque work
      const figure = document.createElement('figure');

      // Création de l'image pour work
      const image = document.createElement('img');
      image.src = work.imageUrl;  // Définition de l'URL de l'image
      image.alt = work.title;     // Ajout d'un titre

      // Création de la légende pour afficher le titre 
      const legendeImage = document.createElement('figcaption');
      legendeImage.textContent = work.title;  // Définition du texte de la légende

      // Ajouter l'image et la légende à la balise <figure>
      figure.appendChild(image);
      figure.appendChild(legendeImage);

      // Ajouter la figure à la galerie
      gallery.appendChild(figure);
  });
}
// Fonction asynchrone pour afficher les boutons de catégories
export async function displayCategoriesButtons() {

  // Récupération des catégories depuis l'API
  const categories = await recoveryCategories();

  // Sélection du conteneur des boutons de filtres
  const filtersContainer = document.querySelector('.categorie_filtre');

  // Vérification si le conteneur des filtres existe
  if (!filtersContainer) {
      console.error('Le conteneur des filtres est introuvable.');
      return;
  }

  // Création du bouton "Tous" pour afficher toutes les catégories
  const allButton = document.createElement('button');
  allButton.textContent = 'Tous'; // Texte du bouton
  allButton.id = 'all'; // ID pour identifier ce bouton
  allButton.classList.add('active'); // Ajout de la classe "active" 
  filtersContainer.appendChild(allButton); // Ajout du bouton dans le conteneur

  // Récupération de tous les works depuis l'API
  const allWorks = await recoveryWorks();

  // Affichage de tous les works par défaut
  displayWorks(allWorks);

  /**
   * Fonction qui filtre les travaux en fonction de la catégorie sélectionnée
   * @param {string | number} categoryId - L'identifiant de la catégorie sélectionnée
   */
  const filterWorks = (categoryId) => {
      // Supprime la classe "active" de tous les boutons pour éviter les doublons
      filtersContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));

      // Si "Tous", affiche tous les travaux
      if (categoryId === 'all') {
          displayWorks(allWorks);
          allButton.classList.add('active'); // Ajoute la classe "active" au bouton "Tous"
      } else {
          // Filtrer les travaux en fonction de l'ID de la catégorie sélectionnée
          const filteredWorks = allWorks.filter(work => work.categoryId === categoryId);
          displayWorks(filteredWorks); // Affiche uniquement les travaux filtrés
          document.getElementById(categoryId).classList.add('active'); // Met en surbrillance le bouton de la catégorie sélectionnée
      }
  };

  // Ajout d'un écouteur d'événement pour le bouton "Tous"
  allButton.addEventListener('click', () => filterWorks('all'));

  // Parcourt toutes les catégories récupérées depuis l'API
  categories.forEach(category => {
      // Création d'un bouton pour chaque catégorie
      const btn = document.createElement('button');
      btn.textContent = category.name; // Nom de la catégorie affiché sur le bouton
      btn.id = category.id; // ID unique pour identifier la catégorie
      filtersContainer.appendChild(btn); // Ajout du bouton dans le conteneur des filtres

      // Ajout d'un écouteur d'événement pour filtrer les travaux au clic
      btn.addEventListener('click', () => filterWorks(category.id));
  });
}
// Fonction asynchrone pour gérer l'affichage du header en fonction de l'état de connexion
export async function loginHeader() {
  // Vérifier si l'utilisateur est connecté en récupérant le token depuis le stockage local
  const token = localStorage.getItem("authToken");

  // Sélectionner l'élément <ul> dans le <nav> du header
  const navUl = document.querySelector("header nav ul");

  // Si un token est trouvé, cela signifie que l'utilisateur est connecté
  if (token) {
    // Modifier le contenu du header pour afficher les options de navigation en mode connecté
    navUl.innerHTML = `
      <li><a href="#portfolio">projets</a></li>
      <li><a href="#contact">contact</a></li>
      <li><a id="logout" href="#">logout</a></li>
      <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
    `;

    // Bouton logout
    const logoutButton = document.getElementById("logout");

    // Ajouter un événement au clic sur le bouton logout
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("authToken"); // Supprimer le token d'authentification
      window.location.reload(); // Recharger la page pour appliquer les changements
    });
  }
}
// Fonction asynchrone pour gérer l'affichage des works en mode connecté
export async function loginDisplayWorks() {
  try {
    // Récupération des projets depuis l'API
    const works = await recoveryWorks();

    // Vérification de l'authentification de l'utilisateur via le token stocké
    const token = localStorage.getItem("authToken");

    if (token) {
      // Si l'utilisateur est connecté, modification de l'affichage

      // Sélection des sections de la page
      const projetSection = document.querySelector("#portfolio .section-projets");
      const portfolioSection = document.querySelector("#portfolio .categorie_filtre");

      // Modification du contenu HTML de la section des projets
      projetSection.innerHTML = `
        <h2 class="titre-projets">Mes projets</h2> 
        <button class="btn-modifier" id="modifier-button">
          <i class="fas fa-edit icon-modifier"></i> <span>modifier</span>
        </button>
      `;

      // Ajout d'un événement sur le bouton "modifier"
      document.getElementById("modifier-button").addEventListener("click", () => {
        // Vérifie si la fonction `openModal` est définie
        if (typeof window.openModal === "function") {
          window.openModal(); // Ouvre la modale pour l'édition des projets
        } else {
          console.error("La fonction openModal n'est pas définie !");
        }
      });

      // Cache la section contenant les catégories de filtres
      portfolioSection.style.display = "none";

    } else {
      // Si l'utilisateur n'est pas connecté, afficher les projets normalement
      displayWorks(works);
    }

  } catch (error) {
    // Capture et affiche une erreur si la récupération des projets échoue
    console.error("Une erreur est survenue lors du chargement des projets", error);
  }
};
// Fonction asynchrone pour afficher une barre noire en mode édition si l'utilisateur est connecté
export async function loginBlackBar() {
  try {
    // Récupération du token d'authentification stocké dans localStorage
    const token = localStorage.getItem("authToken");

    // Vérification si l'utilisateur est connecté
    if (token && !window.location.href.includes()) {
      
      // Création d'un élément <div> pour représenter la barre noire d'édition
      const barreNoire = document.createElement("div");
      barreNoire.id = "barreNoireid"; // Ajout d'un ID pour identifier la barre noire

      // Définition du contenu HTML de la barre noire
      barreNoire.innerHTML = `
        <div class="barreNoireid-content">
          <i class="fa-regular fa-pen-to-square"></i> Mode édition
        </div>
      `;

      // Ajout de la barre noire à la fin du body
      document.body.appendChild(barreNoire);
    }

  } catch (error) {
    // Gestion des erreurs en cas d'échec de l'ajout de la barre noire
    console.error("Erreur lors de l'ajout de la barre noire :", error);
  }
}
// Fonction asynchrone pour afficher les works dans la galerie d'une modale
export async function displayWorksModale(works) {

  // Sélection de l'élément contenant la galerie dans la section de la modale
  const gallerymodale = document.querySelector('#sectionmodale .gallery-modale');

  // Vérification si la galerie a bien été trouvée dans le DOM
  if (!gallerymodale) {
      console.error("L'élément '.gallery-modale' est introuvable !");
      return;
  }

  // S'assurer que la galerie est vide avant d'ajouter de nouveaux éléments
  gallerymodale.innerHTML = '';

  // Parcours de chaque projet récupéré depuis l'API
  works.forEach(work => {

      // Création d'un élément <figure> pour contenir chaque projet
      const figure = document.createElement('figure');

      // Création d'un élément <img> pour afficher l'image du projet
      const image = document.createElement('img');
      image.src = work.imageUrl;  // Définition de l'URL de l'image

      // Ajout de l'image à l'élément <figure>
      figure.appendChild(image);

      // Ajout de la figure complète à la galerie de la modale
      gallerymodale.appendChild(figure);
  });
}