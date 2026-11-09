# PROJET FIL ROUGE

## Auteurs
-DIOA06530008, Dion, Anne-Katrine 
<br>
-BELA24600100, Belley-Guimond, Alexandrine
<br>
Messagerie instanée pour échanger des messages dans un chat général ou dans des sessions entre des utilisateurs spécifiques. 
<br>
Fonctionnalités :
<br>
•Inscription (adresse email et mot de passe) et connexion au site, déconnexion
<br>
•Chat général déja implimenté
<br>
•Création de salons pour discuter avec des utilisateurs précis
<br>
•Messages envoyés en temps réel et avec heure d'envoi
<br>
•Fonction "utilisateurs connectés" afin de voir en temps réel qui est présent dans les chats
<br>
•Chats et salons conservés lors d'un rechargement de la page ou d'une déconnexion
<br>

Technologies :
<br>
•Interaface = HTML, CSS, Javascript
<br>
•Authentification et base de données = Supabase
<br>
•Bibliothèque côté client = supabase.js
<br>

Structure de projet :
<br>
webchat/
<br>
├── index.html          Page principale (Inscription et connexion)
<br>
├── parametres.html         Déconnexion et retour aux conversations
<br>
├── conversations.html       Page contenant le chat général ainsi que les salons. Contient également l'option de se rendre aux parametres
<br>
└── ressources/
<br>
    ├── styles/        
    <br>
    │   ├── conversations.css    Mise en page des salons et messages
    <br>
    │   ├── index.css    Mise en age de connexion et d'inscription
    <br>
    │   └── parametres.css   Mise en page de parametres
    <br>
    └── scripts/
    <br>
        ├── script.js    Accès aux données (objet Data)
        <br>
        ├── spclient.js Configuration et création du client Supabase
        <br>
        ├── auth.js     Authentification (objet Auth)
        <br>
        ├── index.js     Logique page de connexion
        <br>
        ├── parametres.js     Logique de la page des parametres
        <br>
        ├── conversations.js   Logique de la page principale
        <br>
        
          

Images - Annexe
<img width="1920" height="1276" alt="sunriseforever-moon-7102510_1920" src="https://github.com/user-attachments/assets/76e00e52-1e18-4d70-8d37-271bf8de904d"/>
<br>


