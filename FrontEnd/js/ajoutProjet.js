export function ajoutProjets() {

    const ajoutprojetForm = document.querySelector("nouveauProjet");

    ajoutprojetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Création de l’objet du nouvel avis.
    const newprojet = {
        Title: event.target.querySelector("[name=title]").value,
        imageUrl: event.target.querySelector("[name=imageUrl]").value,
        categoryId: parseInt(event.target.querySelector("[name=categoryId]").value),
    };
 
    console.log("newprojet");
});

}
    /* 
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(ajoutprojetForm);
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:5678/api-docs/#/default/post_works", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
    console.log (chargeUtile);
    };
 */