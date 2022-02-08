let produitLocalStorage = JSON.parse(localStorage.getItem("produit"))
console.log(produitLocalStorage)
let formulaire = document.getElementById("formulaire")
// Afficher les produits du panier 
let elementPanier = document.getElementById("container_panier")
// Tester si le panier est vide
if(produitLocalStorage === null || produitLocalStorage == 0) {
    let panierVide = '<h2>Le panier est vide</h2>'
    elementPanier.innerHTML = panierVide
    formulaire.style.display = "none"
    btnSupprAll.style.display = "none"
} else {
    let structurePanier = []
    for (k = 0; k < produitLocalStorage.length; k++) {
        structurePanier = structurePanier + '<div id="container_panier_list">'
        + '<h2>' +  produitLocalStorage[k].name + '</h2>'
        + '<h3>' + produitLocalStorage[k].price + 'e</h3>'
        + '<h4>' + 'Option : ' + produitLocalStorage[k].lenses  + '</h4>'
        + '<button class="btn-supprimer">Supprimer</button>'
        + '</div>'
    }
    if (k == produitLocalStorage.length) {
        elementPanier.innerHTML = structurePanier
    }
}
// Bouton vider le panier
let btnSupprAll = document.getElementById("btn-supprAll")
function suppr(){
    localStorage.removeItem("produit");
    location.reload();
}
// Bouton supprimer un élément
let btnSuppr = document.querySelectorAll(".btn-supprimer")
for (let i = 0; i < btnSuppr.length; i++) {
    btnSuppr[i].addEventListener("click", (event) =>{
        event.preventDefault()
        // Selection de l'id à supprimer en cliquant sur le bouton
        let idSuppr = produitLocalStorage[i].id
        console.log(idSuppr)
        // Filter = Sélection des éléments à garder et suppression du reste
        produitLocalStorage = produitLocalStorage.filter(e => e.id !== idSuppr)
        // Envoie de la variable dans le localeStorage
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage))
        // Réactualisation de la page
        window.location.href = "panier.html"
    })
    
}
// Montant total du panier
let totalPrix = [];

//Aller chercher les prix
for (let m = 0; m < produitLocalStorage.length; m++) {
    let prixProduit = produitLocalStorage[m].price;
    totalPrix.push(prixProduit)
}
// Additionner les prix
const reducer = (previousValue, currentValue) => previousValue + currentValue;
const calculPrix = totalPrix.reduce(reducer,0);

// Afficher le résultat du prix total
const affichagePrix = '<h2 class="affichage_prix">Total : ' + calculPrix + ' €</h2>'
elementPanier.insertAdjacentHTML("beforeend", affichagePrix)

// Addenventlistener sur le bouton valider le formulaire
const btn_envoyerFormulaire = document.querySelector("#btn_envoyerFormulaire")
btn_envoyerFormulaire.addEventListener("click", (e)=>{
    e.preventDefault()
// Récupérer les valeurs du formulaire
const form = {
    nom: document.querySelector('#nom').value,
    prenom: document.querySelector('#prenom').value,
    adresse: document.querySelector('#adresse').value,
    codePostal: document.querySelector('#codePostal').value,
    ville:  document.querySelector('#ville').value,
    pays: document.querySelector('#pays').value,
    email: document.querySelector('#email').value,
}

// Function pour crée un texte d'erreur
function textValideFrom(id) {
    document.querySelector(id).textContent = ""
}
function textErreurFrom(id) {
    document.querySelector(id).textContent = " Veuillez bien remplir ce champ"
}

// Vérfier si le formulaire est correcte
function nomControle() {
    const verifNom = form.nom
    if(/^[A-Za-z]{2,25}$/.test(verifNom)) {
        textValideFrom("#nomManquant")
        return true
    }else {
        textErreurFrom("#nomManquant")
        return false
    }
}

function prenomControle() {
    const verifPrenom = form.prenom
    if(/^[A-Za-z]{2,15}$/.test(verifPrenom)) {
        textValideFrom("#prenomManquant")
        return true
    }else {
        textErreurFrom("#prenomManquant")
        return false
    }
}

function adresseControle() {
    const verifAdresse = form.adresse
    if(/^[A-Za-z0-9\s]{6,50}$/.test(verifAdresse)) {
        textValideFrom("#adresseManquant")
        return true
    }else {
        textErreurFrom("#adresseManquant")
        return false
    }
}

function codePostalControle() {
    const verifCodePostal = form.codePostal
    if(/^[0-9]{5}$/.test(verifCodePostal)) {
        textValideFrom("#codePostalManquant")
        return true
    }else {
        textErreurFrom("#codePostalManquant")
        return false
    }
}

function villeControle() {
    const verifVille = form.ville
    if(/^[A-Za-z]{2,15}$/.test(verifVille)) {
        textValideFrom("#villeManquant")
        return true
    }else {
        textErreurFrom("#villeManquant")
        return false
    }
}

function paysControle() {
    const verifPays = form.pays
    if(/^[A-Za-z\s]{3,15}$/.test(verifPays)) {
        textValideFrom("#paysManquant")
        return true
    }else {
        textErreurFrom("#paysManquant")
        return false
    }
}
function emailControle() {
    const verifEmail = form.email
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(verifEmail)) {
        textValideFrom("#emailManquant")
        return true
    }else {
        textErreurFrom("#emailManquant")
        return false
    }
}

// Convertir en chaine de caractère pour les envoyers dans le localstorage
if (nomControle() && prenomControle() && adresseControle() && codePostalControle() && villeControle() && paysControle() && emailControle()) {
    localStorage.setItem("from", JSON.stringify(form))
}else{
    
}
// Tout les éléments enregistrés 
const valuEnregistrer = {
    produitLocalStorage,
    form
}
console.log(valuEnregistrer)

// Envoie 'valueEnregistrer' vers le serveur //
const serveur01 = fetch("http://localhost:3000/api/cameras", {
    method: "POST",
    body: JSON.stringify(valuEnregistrer),
    headers: {
        "Content-Type": "application/json",
    },
})
console.log("serveur01")
}) // FIN DE ADDEVENTLISTENER //

// Laisser les données du localstorage afficher //
// Récupération du localstorage //
const dataLocalStorage = localStorage.getItem("from")
// Convertir en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage)
// Fonction pour remplir le formulaire avec les données du localstorage //
function ajoutDataLocalStorage(input) {
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input]
}

ajoutDataLocalStorage("nom")
ajoutDataLocalStorage("prenom")
ajoutDataLocalStorage("adresse")
ajoutDataLocalStorage("codePostal")
ajoutDataLocalStorage("ville")
ajoutDataLocalStorage("pays")
ajoutDataLocalStorage("email")