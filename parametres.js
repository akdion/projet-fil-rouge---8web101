const boutonDeconnexion = document.getElementById("btn-logout");

boutonDeconnexion.addEventListener("click", async () => {
    const { error } = await Auth.signOut();

    if (error) {
        console.error("Erreur de déconnexion :", error);
        return;
    }

    window.location.replace("index.html");
});