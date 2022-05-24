/* 
* @file TP2
* @author Graignon Maxime <2031817@csfoy.ca>
* @version 0.0.3
*/



// Initiation des variables globales
const strIconeAvertissement = `<span>
    <span class="screen-reader-only">Avertissement</span>
    <span class="icone icone--avertissement"></span>
</span>`;

// Déclaration d'objet
const objFormulaire = {
    initialiser: function () {

        // À compléter (ajouter les autres écouteurs d'événement)
        document.getElementById('prenom').addEventListener('blur', this.validerChampTexte.bind(this));
        document.getElementById('nom').addEventListener('blur', this.validerChampTexte.bind(this));
        document.getElementById('adresse').addEventListener('blur', this.validerChampTexte.bind(this));
        document.getElementById('ville').addEventListener('blur', this.validerChampTexte.bind(this));
        document.getElementById('codepostal').addEventListener('blur', this.validerChampTexte.bind(this));
        document.getElementById('courriel').addEventListener('blur', this.validerChampTexte.bind(this));
        document.getElementById('numero').addEventListener('blur', this.validerChampTexte.bind(this));
        document.getElementById('mystere-resolu').innerText = `${objJSONEpigraphes[localStorage.id_personnage].MYSTERE.SEGMENT}${objJSONEpigraphes[localStorage.id_objet].MYSTERE.SEGMENT}${objJSONEpigraphes[localStorage.id_lieu].MYSTERE.SEGMENT}`;

        document.getElementById('province').addEventListener('blur', this.validerListeDeroulante.bind(this));
        document.getElementById('province').addEventListener('change', this.validerListeDeroulante.bind(this));

        document.getElementById('acceptation_reglement').addEventListener('blur', this.validerAcceptationReglement.bind(this));
        document.getElementById('acceptation_reglement').addEventListener('change', this.validerAcceptationReglement.bind(this));


        const arrBtn = document.querySelectorAll('[name=question]');

        arrBtn.forEach((refBouton) => {
            refBouton.addEventListener('blur', this.validerReponseParticipant.bind(this));
            refBouton.addEventListener('change', this.validerReponseParticipant.bind(this));
        });
    },




    /**
     * Fonction permettant de valider les différents champs de texte 
     * @param {object} objEvenement 
     */
    validerChampTexte: function (objEvenement) {
        const objCible = objEvenement.currentTarget;
        const refCtnValidation = objCible.closest('.ctnValidation');
        const refMessageErreur = refCtnValidation.querySelector('.erreur');

        if (objCible.value == '') {
            refCtnValidation.classList.add(".erreur");
            refMessageErreur.innerHTML = objJSONMessagesErreur[objCible.id].vide;
        } else if (!blnChaineValide) {
            refMessageErreur.innerHTML = strIconeAvertissement + ' ' + objJSONMessagesErreur[objCible.id].motif;
            refCtnValidation.classList.add(".erreur");
        } else {
            refCtnValidation.classList.remove(".erreur");
            refMessageErreur.innerHTML = '';
        }
    },

    /**
     * Fonction permettant de valider les lites déroulantes
     * @param {object} objEvenement 
     */
     validerListeDeroulante: function (objEvenement) {
        console.log('allo')
        const objCible = objEvenement.currentTarget;
        const refCtnValidation = objCible.closest('.ctnValidation');
        const refMessageErreur = refCtnValidation.querySelector('.erreur');

        if (objCible.value == '0') {
            refMessageErreur.innerHTML = strIconeAvertissement + ' ' + objJSONMessagesErreur[objCible.id].vide;
            refCtnValidation.classList.add("erreur");
        } else {
            refCtnValidation.classList.remove("erreur");
            refMessageErreur.innerHTML = ' ';
        }
    },

    /**
     * Fonction permettant de valider la réponse des participants dans les cases à cocher
     * @param {object} objEvenement 
     */
    validerReponseParticipant: function (objEvenement) {
        const objCible = objEvenement.currentTarget;
        const regex = new RegExp(`^${objCible.pattern}$`);
        const blnChaineValide = regex.test(objCible.value);
        const refCtnValidation = objCible.closest('.ctnValidation');
        const refMessageErreur = refCtnValidation.querySelector('.erreur');
        const refRadioSelectionne = document.querySelector('[name=question]:checked');


        if (refRadioSelectionne === null) {
            refMessageErreur.innerHTML = strIconeAvertissement + ' ' + objJSONMessagesErreur.reponseParticipant.vide;
            refCtnValidation.classList.add("erreur");
        } else {
            refCtnValidation.classList.remove("erreur");
            refMessageErreur.innerHTML = "";
        }
    },

    /**
     * Fonction permettant de valider si l'utilisateur à accepter le réglements
     * @param {object} objEvenement 
     */
    validerAcceptationReglement: function (objEvenement) {
        const objCible = objEvenement.currentTarget;
        const regex = new RegExp(`^${objCible.pattern}$`);
        const blnChaineValide = regex.test(objCible.value);
        const refCtnValidation = objCible.closest('.ctnValidation');
        const refMessageErreur = refCtnValidation.querySelector('.erreur');
        const refRadioSelectionne = document.querySelector('[name=reglement]:checked');


        if (refRadioSelectionne === null) {
            refMessageErreur.innerHTML = strIconeAvertissement + ' ' + objJSONMessagesErreur.reglement.vide;
            refCtnValidation.classList.add("erreur");  
        } else {
            refCtnValidation.classList.remove("erreur");
            refMessageErreur.innerHTML = "";
        }
    }
};

    

// Déclaration de l'écouteur d'événement 'load'
// À compléter
window.addEventListener('load', function () {
    objFormulaire.initialiser();
});

