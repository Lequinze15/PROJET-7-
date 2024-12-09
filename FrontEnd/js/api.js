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

export async function login(email, password) {
    try {
      // URL de l'API pour la soumission
      const url = "http://localhost:5678/api/users/login";
  
      // Configuration de la requête POST
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indique que les données sont en JSON
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }), // Convertit les données en JSON
      });
  
      console.log(response);
  
      // Vérifie si la réponse est correcte
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
  
      // Parse la réponse en JSON
      const data = await response.json();
      console.log(data);
  
      // Stockage du token dans le local storage

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        console.log("Token stocké avec succès dans le localStorage.");
    } else {
        console.warn("Aucun token trouvé dans la réponse.");
    }
  
      // Retourne les données reçues
      return data;
    } catch (error) {
      console.error("Erreur :", error);
      throw error; 
    }
  }

