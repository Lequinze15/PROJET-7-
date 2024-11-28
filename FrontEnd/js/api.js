export async function recuperationCategories() {
    try {
        // Récupération des catégories depuis l'API
        const responseCategories = await fetch('http://localhost:5678/api/categories'); 
        
        // faire un console.log de responseCategories pour comprendre le contenu
        console.log(responseCategories);

        if (!responseCategories.ok) {
            throw new Error(`Erreur HTTP: ${responseCategories.status}`);
        }
        
        const categories = await responseCategories.json();
        console.log(categories);
        return categories;
        

    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        throw error; // Propage l'erreur pour une meilleure gestion
    }
}


export async function recuperationWorks() {

    try {
        // Récupération des projet depuis l'API
        const responseProjet = await fetch('http://localhost:5678/api/works'); 

        // faire un console.log de responseProjet pour comprendre le contenu
        console.log(responseProjet);
        
        if (!responseProjet.ok) {
            throw new Error(`Erreur HTTP: ${responseProjet.status}`);
        }
        
        const projets = await responseProjet.json();
        console.log(projets);
        return projets;

    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        throw error; // Propage l'erreur pour une meilleure gestion
    }
}

/*  
ERREUR CAR AUCUNE DONNEES A RECUPERER

export async function recuperationLogin() {
    try {
        // Récupération des catégories depuis l'API
        const responseLogin = await fetch('http://localhost:5678/api/users/login'); 
        
        // faire un console.log de responseCategories pour comprendre le contenu
        
        if (!responseLogin.ok) {
            throw new Error(`Erreur HTTP: ${responseLogin.status}`);
        }
        
        const login = await responseLogin.json();
        console.log(login);
        return login;
        

    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        throw error; // Propage l'erreur pour une meilleure gestion
    }
}*/
