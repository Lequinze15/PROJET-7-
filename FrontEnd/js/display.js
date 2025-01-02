import { recuperationCategories, recuperationWorks} from "./api.js";

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
 
    const filtersContainer = document.querySelector('.categorie_filtre');

    if (!filtersContainer) {
        console.error('Le conteneur des filtres est introuvable.');
        return;
    }

    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.id = 'all';
    allButton.classList.add('active'); 
    filtersContainer.appendChild(allButton);

    const allWorks = await recuperationWorks();

    displayWorks(allWorks);
    // console.log (allWorks); 


    const filterWorks = (categoryId) => {
        filtersContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        if (categoryId === 'all') {
            displayWorks(allWorks);
            allButton.classList.add('active');
        } else {
            const filteredWorks = allWorks.filter(work => work.categoryId === categoryId);
            displayWorks(filteredWorks);
            document.getElementById(categoryId).classList.add('active');
        }
    };


    allButton.addEventListener('click', () => filterWorks('all'));

 
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.textContent = category.name;
        btn.id = category.id;
        filtersContainer.appendChild(btn);

     
        btn.addEventListener('click', () => filterWorks(category.id));
    });
}

export async function loginHeader() {
  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem("authToken");

  const navUl = document.querySelector("header nav ul");

  if (token) {
    // Si connecté, modifier le contenu du header
    navUl.innerHTML = `
      <li><a href="#portfolio">projets</a></li>
      <li><a href="#contact">contact</a></li>
      <li><a id="logout" href="#">logout</a></li>
      <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
    `;

    // Ajouter un événement pour le bouton logout
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("authToken"); // Supprimer le token
      window.location.reload(); // Recharger la page
    });
  }
}

export async function loginAffichageWorks() {
  try {
    // Appel à l'API pour récupérer les projets
    const works = await recuperationWorks();

    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("authToken");

    if (token) {
      // Si l'utilisateur est connecté 
     const  projetSection = document.querySelector("#portfolio .section-projets");
    const portfolioSection = document.querySelector("#portfolio .categorie_filtre");


  projetSection.innerHTML = '	<h2 class="titre-projets">Mes projets</h2> <button class="btn-modifier" id="modifier-button"> <i class="fas fa-edit icon-modifier"></i> <span>modifier</span> </button>';
  
  document.getElementById("modifier-button").addEventListener("click", () => {
    window.location.href = "Modale.html";});
  
  portfolioSection.style.display ="none";


    } else {
      displayWorks(works);
    }
  } catch (error) {
    console.error("Une erreur est survenue lors du chargement des projets", error);
  }
};

export async function loginBarreNoire() {
  try {
    const token = localStorage.getItem("authToken");

    if (token && !window.location.href.includes("Modale.html")) {
      const barreNoire = document.createElement("div");
      barreNoire.id = "barreNoireid";
      barreNoire.innerHTML = `
      <div class="barreNoireid-content">
        <i class="fa-regular fa-pen-to-square"></i> Mode édition
      </div>
    `;

       document.body.appendChild(barreNoire);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la barre noire :", error);
    }
  }

export async function displayWorksModale(works) {

    // Sélection de la galerie dans la section portfolio
    const gallerymodale = document.querySelector('#sectionmodale .gallery-modale');

    // S'assurer que la galerie est vide avant d'ajouter les éléments
    gallerymodale.innerHTML='';

    // Parcourir chaque work récupéré depuis l'API
    works.forEach(work => {

        // Création de la balise figure
        const figure = document.createElement('figure');

        // Création de l'image pour le work
        
        const image = document.createElement('img');
        image.src = work.imageUrl;    

        // Ajouter l'image et la légende à la balise figure
        figure.appendChild(image);

        // Ajouter la figure à la galerie
        gallerymodale.appendChild(figure);
    });
}