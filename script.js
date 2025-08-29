const produits = [
  { nom: "Riz frit", prix: 5000, categorie: "plat", image: "images/image17.jpg" },
  { nom: "Cocktail de Pastèque", prix: 7000, categorie: "boison", image: "images/boisson3.jpg" },
  { nom: "Puré d'avocat complet ", prix: 15000, categorie: "plat", image: "images/image15.jpg" },
  { nom: "Plat complet ", prix: 15000, categorie: "plat", image: "images/image16.jpg" },
  { nom: "Citron ", prix: 10000, categorie: "fruit", image: "images/fruit1.jpg" },
  { nom: "Mandarine", prix: 7000, categorie: "fruit", image: "images/fruit2.jpg" },
   { nom: "Oeuf bouillés ", prix: 120000, categorie: "plat", image: "images/image19.jpg" },
  { nom: "Macaronie", prix: 18000, categorie: "plat", image: "images/image12.jpg" },
  { nom: "Pomme de France", prix: 7000, categorie: "fruit", image: "images/fruit3.jpg" },
  { nom: "Pastèque", prix: 8000, categorie: "fruit", image: "images/fruit4.jpg" },
  { nom: "Fraise", prix: 6000, categorie: "fruit", image: "images/fruit5.jpg" },
  { nom: "Coca", prix: 7000, categorie: "boison", image: "images/boisson1.jpg" },
  { nom: "Cocktail de Citron", prix: 3000, categorie: "boison", image: "images/boisson2.jpg" },
  { nom: "Cocktail d'Orange ", prix: 2500, categorie: "boison", image: "images/boisson4.jpg" },
  { nom: "Fruit Complet", prix: 1000, categorie: "fruit", image: "images/fruit6.jpg" }
];


function afficherProduits(liste) {
  const conteneur = document.getElementById("listeProduits");
  conteneur.innerHTML = "";

  if (liste.length === 0) {
    conteneur.innerHTML = "Aucun produit trouvé.";
    return;
  }

  liste.forEach((produit,i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" style=" height:200px; border-radius:6px; margin-bottom:10px; width: 100%; object-fit: cover;" alt="">
      <h3 style="padding: 15px; text-align: center;">${produit.nom}</h3>
      <p style="padding: 15px; text-align: center;">Prix : ${produit.prix} FCFA</p>
      <p style="padding: 15px; text-align: center;">Catégorie : ${produit.categorie}</p>
      <button onclick="modifierProduit(${i})"  style=" padding: 15px 20px; background-color: #e91e63; color: white; border: none; border-radius: 5px;cursor: pointer;">Modifier</button>
      <button onclick="supprimerProduit(${i})" style=" padding: 15px 20px;  background-color: #e91e63;  color: white; border: none; border-radius: 5px; cursor: pointer;">Supprimer</button>


    `;
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "8px";
    div.style.width= "300px";
    div.style.height= "500px";
    div.style.padding = "10px";
    div.style.margin = "10px";
    div.style.maxWidth = "300px";
    div.style.textAlign = "center";
    div.style.display = "inline-block";
    div.style.backgroundColor = "#fdfdfd";
    div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    conteneur.appendChild(div);
  });
}

function ajouterProduit() {
  const nom = document.getElementById("nomProduit").value.trim();
  const prix = parseFloat(document.getElementById("prixProduit").value);
  const categorie = document.getElementById("categorieProduit").value.trim();
  const image = document.getElementById("imageProduit").value.trim() || "images/default.jpg";

  if (!nom || isNaN(prix) || !categorie) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  const nouveauProduit = { nom, prix, categorie, image };
  alert("ajouté avec succès!");
  produits.push(nouveauProduit);
  afficherProduits(produits); 
}

// Fonction de modofication 
let indexEnCours = null;

function modifierProduit(index) {
  const produit = produits[index];
  document.getElementById("nomProduit").value = produit.nom;
  document.getElementById("prixProduit").value = produit.prix;
  document.getElementById("categorieProduit").value = produit.categorie || "";
  document.getElementById("imageProduit").value = produit.image || "";

  indexEnCours = index;

  document.getElementById("ajouterBtn").style.display = "none";
  document.getElementById("modifierBtn").style.display = "inline";
  document.querySelector(".ajout-produit").scrollIntoView({ behavior: "smooth" });
}


// Fonction de Valider modification
function validerModification() {
  const nom = document.getElementById("nomProduit").value.trim();
  const prix = parseFloat(document.getElementById("prixProduit").value);
  const categorie = document.getElementById("categorieProduit").value.trim();
  const image = document.getElementById("imageProduit").value.trim();

  if (!nom || isNaN(prix) || !categorie) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  produits[indexEnCours] = { nom, prix, categorie, image };
  afficherProduits(produits);
  alert("modifié avec succès!")
  resetForm();
}


// Fonction Reset
function resetForm() {
  document.getElementById("nomProduit").value = "";
  document.getElementById("prixProduit").value = "";
  document.getElementById("categorieProduit").value = "";
  document.getElementById("imageProduit").value = "";

  document.getElementById("ajouterBtn").style.display = "inline";
  document.getElementById("modifierBtn").style.display = "none";
  indexEnCours = null;
}


// Foction suppression
function supprimerProduit(index) {
  if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
    produits.splice(index, 1);
    afficherProduits(produits);
  }
  alert("Suppression réussié!")
}





function filtrerProduits() {
  const prix = parseInt(document.getElementById("filtrePrix").value);
  const categorie = document.getElementById("filtreCategorie").value;

  console.log(prix);
  console.log(categorie);
  const resultat = produits.filter(p => {
    return p.prix <=  prix && p.categorie === categorie;
  });

  afficherProduits(resultat);
}

document.getElementById("boutonFiltrer").addEventListener("click", filtrerProduits);

// Afficher tous les produits au chargement
onload = () => afficherProduits(produits);



