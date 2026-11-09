const inputEmailsignup = document.getElementById("signup-email");
console.log(inputEmailsignup);
const inputPasswordsignup = document.getElementById("signup-password");

const inputEmailsignin = document.getElementById("signin-email");
console.log(inputEmailsignin);
const inputPasswordsignin = document.getElementById("signin-password");

function readCredentials(inputEmail, inputPassword) {
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

function getValidCredentials(inputEmail, inputPassword) {
  const credentials = readCredentials(inputEmail, inputPassword);
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
  
  const credentials = getValidCredentials(inputEmailsignin, inputPasswordsignin);
  if (!credentials) return;
  
  const { error } = await Auth.signIn(credentials.email, credentials.password);
  if (error) {
    console.log(error);
  }
});


document.getElementById("form-signup").addEventListener("submit", async (event) => {
  event.preventDefault();
  const credentials = getValidCredentials(inputEmailsignup, inputPasswordsignup);
  if (!credentials) return;

  const { error } = await Auth.signUp(credentials.email, credentials.password);
  if (error) {
    console.log(error);
  } else {
    console.log("Compte créé. Veuillez vérifier votre adresse courriel pour confirmer l'inscription.");
  }
});



Auth.onSessionChange((event, session) => {
  if (session?.user) {
    window.location.replace("conversations.html");
  }
});
