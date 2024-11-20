

async function recuperationCategories() {
    // Récupération des catégories stockées dans le localStorage
    let categories = window.localStorage.getItem('categories');

    if (categories === null) {
        try {
            // Récupération des catégories depuis l'API
            const responsecategories = await fetch('http://localhost:5678/api/categories'); 
          
            categories = await responsecategories.json();

            // Transformation des catégories en JSON
            const valeurCategories = JSON.stringify(categories);

            // Stockage des informations dans le localStorage
            window.localStorage.setItem('categories', valeurCategories);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories :', error);
            return; // Arrête l'exécution si une erreur se produit
        }
    } else {
        
        categories = JSON.parse(categories);
    }

    // Affichage des catégories dans la console
    console.log(categories);
}

// Appel de la fonction
recuperationCategories();

async function recuperationProjet() {
    // Récupération des catégories stockées dans le localStorage
    let works = window.localStorage.getItem('works');

    if (works === null) {
        try {
            // Récupération des projet depuis l'API
            const responseworks = await fetch('http://localhost:5678/api/works'); 
          
            works = await responseworks.json();

            // Transformation des catégories en JSON
            const valeurworks = JSON.stringify(works);

            // Stockage des informations dans le localStorage
            window.localStorage.setItem('works', valeurworks);
        } catch (error) {
            console.error('Erreur lors de la récupération des projets :', error);
            return; // Arrête l'exécution si une erreur se produit
        }
    } else {
   
        works = JSON.parse(works);
    }

    // Affichage des catégories dans la console
    console.log(works);
}

// Appel de la fonction
recuperationProjet();
