const pseudo = "AnneKa";
async function recupererPseudo() {
    const { user, error } = await Auth.getUser();
    if (user && !user.user_metadata?.username) {
    const { error: updateError } = await Auth.updateUsername("AnneKa");

    if (updateError) {
        console.error("Erreur de mise à jour :", updateError);
    } else {
        console.log("Pseudo enregistré avec succès !");
    }
}

    if (error || !user) {
        console.log("Aucun utilisateur connecté");
        return;
    }
    console.log("Courriel du compte connecté :", user.email);
    console.log("Pseudo enregistré :", user.user_metadata?.username);
    console.log("Métadonnées :", user.user_metadata);
    console.log("Pseudo du compte :", user.user_metadata?.username);
}

recupererPseudo();
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


    