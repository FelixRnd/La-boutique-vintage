// Retourne le produit avec l'ID id_product
function getProduct(products, id_product) {
  for (let i = 0; i < products.length; i++) {
    if(products[i]._id == id_product)
      return i
  }
}


function displayBoutique(produits) {
    // On affiche la boutique
    for (let i=0; i < produits.length; i++){
      let produit = produits[i];
      let imgList = document.getElementById("produits");
  
      let div = document.createElement("div")
      div.classList.add('display-camera');
  
      let img = document.createElement("img");
      img.src = produit.imageUrl;
      let a = document.createElement("a")
      a.href = "produit.html?id=" + produit._id
      a.appendChild(img)
      div.appendChild(a)

      let p = document.createElement("p");
      p.classList.add('name');
      p.innerHTML = produit.name;
  
      imgList.appendChild(div)
      div.appendChild(p)
      console.log(produits)
    }
}

fetch("http://localhost:3000/api/cameras")
.then(function(response){
  if(response.ok) {
    return response.json();
  } else {
    console.log("error");
  }
})
.then(function(produits){
  // https://example.com/boutique.html
  // https://example.com/produit.html?id=5be1ef211c9d44000030b062
  let params = (new URL(document.location)).searchParams;
  let id = params.get('id');

// On afficher la page produit
  if(id != null) {

    // On affiche 1 produit
    let index_id = getProduct(produits, id)
    let produitRechercher = produits[index_id]

    // console.log(produitRechercher, id)
    let img = document.getElementById("img")
    img.src = produitRechercher.imageUrl;
    let title = document.getElementById("title")
    title.innerHTML = produitRechercher.name
    let price = document.getElementById("price")
    price.innerHTML = "Prix : " + produitRechercher.price/100 + " €"
    let description = document.getElementById("description")
    description.innerHTML = produitRechercher.description
    let idOption = document.getElementById('option');
    let options = produitRechercher.lenses;
    options.forEach(function(element,key) {
      idOption[key] = new Option(element,key);
  });
 
    let btnBuy = document.querySelector(".btn-buy")
    btnBuy.addEventListener("click", (event)=>{
    // Pour ne pas réactualise pas la page
    event.preventDefault()

    // Retenir l'option choisit
    let choixOption = idOption.options[idOption.selectedIndex].text

    // Récupération des valeurs pour le panier
    let addProduit = {
      id: produitRechercher._id,
      name: produitRechercher.name,
      lenses: choixOption,
      price: produitRechercher.price/100,
      quantite: 1,
      }
      console.log(addProduit)

    // Local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"))
    console.log(produitLocalStorage)
    // Fonction qui ajoute un produit dans le localStorage et traduit en format JSON
    let ajoutproduitLocalStorage = () => {
      produitLocalStorage.push(addProduit)
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage))
    }
    // Verifier le local storage
    if (produitLocalStorage) {
      ajoutproduitLocalStorage()
    }else {
      produitLocalStorage = []
      ajoutproduitLocalStorage()
    }
    })

// On affiche la page boutique    
  } else {
    displayBoutique(produits)
  }
})
