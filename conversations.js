
let pseudo = "Utilisateur";
let salonActuel = null;

async function recupererPseudo() {
    const { user, error } = await Auth.getUser();
    console.log("Utilisateur trouvé :", !!user);
    console.log("Erreur de session :", error?.message);
    if (error || !user) {
        console.log("Aucun utilisateur connecté");
        return;
    }

    pseudo = user.email;
    console.log("Courriel récupéré :", pseudo);
}

recupererPseudo();

const formulaire = document.getElementById("message-form");
recupererPseudo();
const inputMessage = document.getElementById("message-input");
const zoneMessages = document.getElementById("messages");

async function enregistrerMessage(texte) {
    const { user, error: erreurUtilisateur } = await Auth.getUser();

    if (erreurUtilisateur || !user) {
        console.error("Aucun utilisateur connecté");
        return false;
    }

    if (!salonActuel) {
    alert("Sélectionne un salon avant d'envoyer un message.");
    return false;
}

    const { error } = await supabaseClient
        .from("messages")
        .insert({
            channel_id: salonActuel,
            user_id: user.id,
            username: user.email,
            content: texte
        });

    if (error) {
        console.error("Erreur lors de l'enregistrement :", error);
        return false;
    }

    console.log("Message enregistré dans Supabase !");
    return true;
}
async function chargerMessages() {
    if (!salonActuel) {
    return;
}

const { data, error } = await supabaseClient
    .from("messages")
    .select("username, content, created_at, user_id")
    .eq("channel_id", salonActuel)
    .order("created_at", { ascending: true });

    zoneMessages.innerHTML = "";

    const { user } = await Auth.getUser();

data.forEach(function(message) {
    const element = document.createElement("div");
    element.classList.add("message");

    if (user && message.user_id === user.id) {
        element.classList.add("envoye");
    }

        const nom = document.createElement("strong");
        nom.textContent = message.username;

        const contenu = document.createElement("p");
        contenu.textContent = message.content;

        const heure = document.createElement("small");
        heure.textContent = new Date(message.created_at)
            .toLocaleTimeString("fr-CA");

        element.appendChild(nom);
        element.appendChild(contenu);
        element.appendChild(heure);

        zoneMessages.appendChild(element);
    });

    zoneMessages.scrollTop = zoneMessages.scrollHeight;
}

console.log(formulaire);
console.log(inputMessage);
console.log(zoneMessages);

formulaire.addEventListener("submit", async function(event) {
    event.preventDefault();
    const texte = inputMessage.value;
    if (texte === "") {
        return;
    }
    const enregistre = await enregistrerMessage(texte);

    if (!enregistre) {
    alert("Le message n'a pas pu être enregistré.");
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
chargerMessages();
const sonNotification = new Audio("notification.mp3");
    sonNotification.volume = 0.4;
supabaseClient
    .channel("chat-general-realtime")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "messages"
        },
        async (payload) => {
            console.log("Nouveau message reçu :", payload.new);
                if (payload.new.channel_id !== salonActuel) {
                    return;
                }
            const { user } = await Auth.getUser();

            
            if (user && payload.new.user_id !== user.id) {
                sonNotification.currentTime = 0;

                sonNotification.play().catch((error) => {
                    console.log("Son bloqué par le navigateur :", error);
                });
            }

            
            chargerMessages();
        }
    )
    .subscribe((status) => {
        console.log("Statut Realtime :", status);
    });
async function afficherUtilisateursConnectes() {
    const { user, error } = await Auth.getUser();

    if (error || !user) {
        console.error("Utilisateur non connecté");
        return;
    }

    const zoneUtilisateurs = document.getElementById("utilisateurs");

    const presenceChannel = supabaseClient.channel("utilisateurs-en-ligne", {
        config: {
            presence: {
                key: user.id
            }
        }
    });

    function mettreAJourUtilisateurs() {
        const utilisateurs = presenceChannel.presenceState();

        zoneUtilisateurs.innerHTML = "";

        Object.values(utilisateurs).forEach(function(presences) {
            if (presences.length === 0) return;

            const utilisateur = document.createElement("div");
            utilisateur.classList.add("utilisateur-connecte");

            const indicateur = document.createElement("span");
            indicateur.classList.add("statut-en-ligne");

            const nom = document.createElement("span");
            nom.textContent = presences[0].email;

            utilisateur.appendChild(indicateur);
            utilisateur.appendChild(nom);

            zoneUtilisateurs.appendChild(utilisateur);
        });
    }

    presenceChannel
        .on("presence", { event: "sync" }, mettreAJourUtilisateurs)
        .subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await presenceChannel.track({
                    email: user.email
                });
            }
        });
}

afficherUtilisateursConnectes();
const boutonCreerSalon = document.getElementById("creer-salon");
const formulaireSalon = document.getElementById("formulaire-salon");
const inputNomSalon = document.getElementById("nom-salon");
const boutonConfirmerSalon = document.getElementById("confirmer-salon");

boutonCreerSalon.addEventListener("click", function() {
    formulaireSalon.hidden = !formulaireSalon.hidden;
});

boutonConfirmerSalon.addEventListener("click", async function() {
    const nomSalon = inputNomSalon.value.trim();

    if (nomSalon === "") {
        alert("Entre un nom pour ton salon.");
        return;
    }

    const { user, error: erreurUtilisateur } = await Auth.getUser();

    if (erreurUtilisateur || !user) {
        console.error("Utilisateur non connecté");
        return;
    }

    const { error } = await supabaseClient
        .from("channels")
        .insert({
            name: nomSalon,
            created_by: user.id
        });

    if (error) {
    console.error("Code :", error.code);
    console.error("Message :", error.message);
    console.error("Détails :", error.details);
    return;
}

    console.log("Salon créé avec succès !");
    inputNomSalon.value = "";
    formulaireSalon.hidden = true;

    await chargerSalons();
});

async function chargerSalons() {
    const { data, error } = await supabaseClient
        .from("channels")
        .select("id, name, created_by")
        .order("name", { ascending: true });

    if (error) {
        console.error("Erreur de chargement des salons :", error);
        return;
    }

    const { user } = await Auth.getUser();
    const listeSalons = document.getElementById("liste-salons");

    listeSalons.innerHTML = "";

    data.forEach(function(salon) {
        const element = document.createElement("div");
        element.classList.add("salon");

        const nomSalon = document.createElement("span");
        nomSalon.textContent = "# " + salon.name;

        element.appendChild(nomSalon);

        element.addEventListener("click", function() {
            salonActuel = salon.id;

            document.getElementById("titre-salon").textContent =
                "# " + salon.name;

            chargerMessages();
        });

        if (
            user &&
            salon.created_by === user.id &&
            salon.name !== "general"
        ) {
            const boutonSupprimer = document.createElement("button");
            boutonSupprimer.type = "button";
            boutonSupprimer.classList.add("supprimer-salon");
            boutonSupprimer.textContent = "🗑️";
            boutonSupprimer.title = "Supprimer le salon";

            boutonSupprimer.addEventListener("click", async function(event) {
                event.stopPropagation();

                const confirmation = confirm(
                    "Supprimer le salon " + salon.name +
                    " et tous ses messages ?"
                );

                if (!confirmation) return;

                const { data: supprimes, error: erreurSuppression } =
                    await supabaseClient
                        .from("channels")
                        .delete()
                        .eq("id", salon.id)
                        .select("id");

                if (erreurSuppression || !supprimes?.length) {
                    console.error(
                        "Erreur de suppression :",
                        erreurSuppression
                    );
                    alert("Impossible de supprimer ce salon.");
                    return;
                }

                if (salonActuel === salon.id) {
                    salonActuel = null;
                    zoneMessages.innerHTML = "";
                    document.getElementById("titre-salon").textContent =
                        "Sélectionne un salon";
                }

                await chargerSalons();
            });

            element.appendChild(boutonSupprimer);
        }

        listeSalons.appendChild(element);
    });
}
chargerSalons();