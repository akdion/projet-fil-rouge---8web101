console.log("coucou");

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputEmailSignup = document.getElementById("email-signup");
const inputPasswordSignup = document.getElementById("password-signup");

function readCredentials() {
  return {
    email: inputEmail.value.trim(),
    password: inputPassword.value,
  };
}

function validateCredentials(credentials) {
  if (!credentials.email) 
    return "Veuillez saisir votre adresse courriel.";
  if (!credentials.password) 
    return "Veuillez saisir votre mot de passe.";
  return null;
}

function getValidCredentials() {
  const credentials = readCredentials();
  const validationError = validateCredentials(credentials);
  if (validationError) {
    console.log(validationError);
    return null;
  }
  return credentials;
}


console.log(document.getElementById("form-signin"));
document.getElementById("form-signin").addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const credentials = getValidCredentials();
  if (!credentials) return;
  
  const { error } = await Auth.signIn(credentials.email, credentials.password);
  if (error) {
    console.log(error);
  }
});

document.getElementById("form-signup").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value;
  if (!email || !password) {
    console.log("Veuillez remplir tous les champs.");
    return;
  }
  const { error } = await Auth.signUp(email, password);
  if (error) {
    console.log(error);}
    else {
      console.log("Compte créer avec succès !");
    }
  });



Auth.onSessionChange((event, session) => {
  if (session?.user) {
    window.location.replace("conversations.html");
  }
});
