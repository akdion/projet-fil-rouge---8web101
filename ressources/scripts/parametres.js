document.getElementById("button-signout").onclick = async () => {
  const { error } = await Auth.signOut();
  if (error) {
    console.error("Impossible de se déconnecter.", error);
  }

}

Auth.onSessionEnded(() => {
  window.location.replace("index.html");
});