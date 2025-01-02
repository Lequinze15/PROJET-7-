import { recuperationWorks } from "./api.js";
import {displayWorksModale} from "./display.js";

export async function affichageWorksModale() {
  try {
    // Appel à l'API pour récupérer les *works*
    const works = await recuperationWorks();

    // Affichage des *works* dans la page
    displayWorksModale(works);
  } catch (error) {
    console.error("Une erreur est survenue lors du chargement des projets", error);

    const gallerymodale = document.querySelector("#sectionmodale.gallery-modale");
  }
}

affichageWorksModale();