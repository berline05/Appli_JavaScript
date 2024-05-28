 //Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 

/*
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/*
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

function validerNom(balise){
    if (balise.value.length < 2) { 
        throw new Error("Le nom est trop court")       
    }
}

function validerEmail(balise){
    let emailRegExp = new RegExp ("[A-Za-z.-_]+@[A-Za-z.-_]+\\.[A-Za-z.-_]+")
    if (!emailRegExp.test(balise.value)) { 
        throw new Error(`L'e-mail' n'est pas valide`)        
    } 
}

function afficherMessageErreur(message){
   
    let spanErreurMessage = document.getElementById("erreurMessage")
    if(!spanErreurMessage){
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
   
        popup.append(spanErreurMessage)
    }

    spanErreurMessage.innerText(message)
}


function gererFormulaire(scoreEmail){
  try{
    let baliseNom = document.getElementById("nom")
    let nom = baliseNom.value
    validerNom (nom)

    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value
    validerEmail(email)

    afficherMessageErreur("")
    afficherEmail(nom, email, scoreEmail)
    
  } catch (erreur){
    //gérer l'erreur
     afficherMessageErreur(erreur.message)
  }
}


/*
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    let score = 0
    let i = 0

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")
    afficherProposition(listeMots[i])
    btnValiderMot.addEventListener("click", () => {
        console.log(inputEcriture.value)
        if (inputEcriture.value === listeMots[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeMots[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeMots[i])
        }
        
    })

    // Gestion de l'événement change sur les boutons radios. 
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i])
        })
    }
    let baliseForm = document.querySelector("form")
    baliseForm.addEventListener("submit", (event)=>{
    event.preventDefault()

    let scoreEmail = `${score} / ${i}` 

    gererFormulaire(scoreEmail) 
    })
    afficherResultat(score, i)
}

