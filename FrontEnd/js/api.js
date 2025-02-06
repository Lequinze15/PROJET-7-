// Fonction de récupération des catégories depuis l'API
export async function recoveryCategories() {
  try {
      // Envoi d'une requête GET à l'API pour récupérer les catégories
      const responseCategories = await fetch('http://localhost:5678/api/categories'); 
      
      // Affichage de la réponse brute dans la console
      console.log(responseCategories);

      // Vérification du statut de la réponse
      if (!responseCategories.ok) {
          throw new Error(`Erreur HTTP: ${responseCategories.status}`);
      }
      
      // Conversion de la réponse en JSON
      const categories = await responseCategories.json();
      console.log(categories);
      return categories;
      
  } catch (error) {
      // Gestion des erreurs lors de la récupération des catégories
      console.error('Erreur lors de la récupération des catégories :', error);
      throw error; // Propage l'erreur 
  }
}
// Fonction de récupération des projets depuis l'API
export async function recoveryWorks() {
  try {
      // Envoi d'une requête GET à l'API pour récupérer les projets
      const responseProjet = await fetch('http://localhost:5678/api/works'); 

      // Affichage de la réponse brute dans la console pour diagnostic
      console.log(responseProjet);
      
      // Vérification du statut de la réponse
      if (!responseProjet.ok) {
          throw new Error(`Erreur HTTP: ${responseProjet.status}`);
      }
      
      // Conversion de la réponse en JSON
      const projets = await responseProjet.json();
      console.log(projets);
      return projets;
  } catch (error) {
      // Gestion des erreurs lors de la récupération des projets
      console.error('Erreur lors de la récupération des projets :', error);
      throw error; // Propage l'erreur 
  }
}
// Fonction de connexion de l'utilisateur
export async function login(email, password) {
  try {
      // URL de l'API pour la soumission des identifiants
      const url = "http://localhost:5678/api/users/login";
  
      // Configuration de la requête POST
      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json", // Indique que les données sont au format JSON
          },
          body: JSON.stringify({
              email: email,
              password: password,
          }), // Convertit les données en JSON
      });
  
      console.log(response); // Vérification de la réponse brute
  
      // Vérification du statut de la réponse
      if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
      }
  
      // Conversion de la réponse en JSON
      const data = await response.json();
      console.log(data); // Affichage des données reçues
  
      // Stockage du token dans le local storage si présent
      if (data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("Token stocké avec succès dans le localStorage.");
      } else {
          console.log("Aucun token trouvé dans la réponse.");
      }
  
      // Retourne les données reçues
      return data;
  } catch (error) {
      // Gestion des erreurs de connexion
      console.error("Erreur lors de la connexion :", error);
      throw error; // Propage l' erreur
  }
}
