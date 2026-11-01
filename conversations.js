const pseudo = "AnneKa";
const formulaire = document.getElementById("message-form");
const inputMessage = document.getElementById("message-input");
const zoneMessages = document.getElementById("messages");

console.log(formulaire);
console.log(inputMessage);
console.log(zoneMessages);

formulaire.addEventListener("submit", function(event) {
    event.preventDefault();
    const texte = inputMessage.value;
    if (texte === "") {
        return;
    }

   const heure = new Date().toLocaleTimeString("fr-CA");
    const message = document.createElement ("div");
    message.classList.add ("message", "envoye");
    const nomUtilisateur = document.createElement("strong");
    nomUtilisateur.textContent = pseudo;
    const contenuMessage = document.createElement("p");
    contenuMessage.textContent = texte;
    message.appendChild(nomUtilisateur);
    message.appendChild(contenuMessage);
    const heureMessage = document.createElement("small");
    heureMessage.textContent = heure;
    message.appendChild(heureMessage);
    zoneMessages.appendChild(message);
    inputMessage.value = "";
    zoneMessages.scrollTop = zoneMessages.scrollHeight;
});


    