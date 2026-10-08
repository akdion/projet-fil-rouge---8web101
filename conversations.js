
function ouvrirConversation(nom) {
    const conversation = document.getElementById("conversation");

    conversation.innerHTML = `
        <h2>${nom}</h2>

        <div class="messages">

            <div class="message recu">
                Salut ! Ça va ?
            </div>

            <div class="message envoye">
                Oui, ça va bien
            </div>
        </div>

        <div class="message-box">

            <input 
                type="text"
                placehoder="Écrire un message..."
            >
            <button>
                Envoyer
            </button>
        </div>
    `;

}

    