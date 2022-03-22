const order = JSON.parse(localStorage.getItem("order")) || [];
const date = JSON.parse(localStorage.getItem("date")) || [];

// affiche Mes informations
const informations = document.getElementById("contact");
informations.innerHTML += `
    <p class="fs-5"><span class="fw-bold text-capitalize">${order.contact.nom}</span>
    , merci pour votre achat sur notre site !</p>

    `;