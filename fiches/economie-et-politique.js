/**
* @file JS-TP3
* @author Michel Kingma-Lord <0801342@csfoy.ca>
* @version 0.0.2
*/

/**
 * Méthode permetttant d'obtenir la valeur d'un des paramètres (QueryParam) dans l'URLgit
 * @param {string} strParam - Nom du paramètre à rechercher dans l'URL
 * @returns {string} - Valeur correspondant au paramètre. 
 *                     Retourne null lorsqu'aucune valeur n'est trouvée.
 */
function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam);
}

// Déclaration d'objet(s)
const objFiche = {
    /**
     * Cette méthode permet d'intégrer les contenus dynamiques provenant du JSON
     */
    initialiser: function () {
        // Prénom et nom dynamiques
        const intIdFicheCourante = obtenirValeurUrlParam('id');
        const objEpigrapheCourante = objJSONEpigraphes[intIdFicheCourante];

        document.title = `${objEpigrapheCourante.PRENOM} ${objEpigrapheCourante.NOM} - Mystère sur Québec`

        document.getElementById('prenom').innerHTML = `${objEpigrapheCourante.PRENOM} `;
        document.getElementById('nom').innerHTML = objEpigrapheCourante.NOM;

        /* IMAGES */

        document.querySelector(".personnage").innerHTML =
            `<source srcset=\'../images/fiche_perso/${intIdFicheCourante}/portrait_300.jpg 1x, ../images/fiche_perso/${intIdFicheCourante}/portrait_600.jpg 2x\'media=\'(max-width:800px)\'><source srcset=\'../images/fiche_perso/${intIdFicheCourante}/portrait_450.jpg 1x, ../images/fiche_perso/${intIdFicheCourante}/portrait_900.jpg 2x\'media=\'(min-width:801px)\'><img class=\'img_personnage\' src=\'../images/fiche_perso/${intIdFicheCourante}/portrait_300.jpg 1x\' 
            alt=\'Portrait de ${objEpigrapheCourante.PRENOM} ${objEpigrapheCourante.NOM}\'
            <p>
                <span id="titre_image"></span> <br>
                ©<span id="credit_image"></span>
            </p>`;

        document.querySelector("#titre_image").innerHTML = objEpigrapheCourante.IMAGE["TITRE"];
        document.getElementById("credit_image").innerText = objEpigrapheCourante.IMAGE["CREDIT"];

        /* SECTION LOCALISATION */
        document.querySelector(".localisation_img--Zoom").innerHTML =
            `<source srcset=\'../images/fiche_perso/${intIdFicheCourante}/lieu_300.jpg 1x, ../images/fiche_perso/${intIdFicheCourante}/lieu_600.jpg 2x\'media=\'(max-width:800px)\'><source srcset=\'../images/fiche_perso/${intIdFicheCourante}/lieu_500.jpg 1x, ../images/fiche_perso/${intIdFicheCourante}/lieu_1000.jpg 2x\'media=\'(min-width:801px)\'><img class=\'img_personnage\' src=\'../images/fiche_perso/${intIdFicheCourante}/lieu_300.jpg 1x\' 
            alt=\'Plan rapproché de l'emplacement sur la carte géographique\'>`;

        document.getElementById("arrondissement").innerText = objEpigrapheCourante.ARRONDISSEMENT;
        document.getElementById("quartier").innerText = objEpigrapheCourante.QUARTIER;
        document.getElementById("adresse").innerText = objEpigrapheCourante.ADRESSE;
        document.getElementById("notes_biographiques").innerText = objEpigrapheCourante.BIOGRAPHIE;

        /* EPIGRAPHES */
        document.querySelector(".plaque").innerHTML =
            `<source srcset=\'../images/fiche_perso/${intIdFicheCourante}/epigraphe_300.png 1x, ../images/fiche_perso/${intIdFicheCourante}/epigraphe_600.png 2x\'media=\'(max-width:800px)\'><source srcset=\'../images/fiche_perso/${intIdFicheCourante}/epigraphe_510.png 1x, ../images/fiche_perso/${intIdFicheCourante}/epigraphe_1020.png 2x\'media=\'(min-width:801px)\'><img class=\'plaque_img\' src=\'../images/fiche_perso/${intIdFicheCourante}/epigraphe_300.png 1x\' 
            alt=\'Epigraphe de ${objEpigrapheCourante.PRENOM} ${objEpigrapheCourante.NOM}\'
            >`;

       document.getElementById("transcript").innerText = objEpigrapheCourante.PLAQUE_TRANSCRIPTION;

        /* SECTION AUDIO */
        document.getElementById("audio_preambule").innerText = objEpigrapheCourante.AUDIO["DESCRIPTION"];
        document.getElementById("audio_url").src = objEpigrapheCourante.AUDIO["URL"];
        document.getElementById("audio_credit").innerText = objEpigrapheCourante.AUDIO["CREDIT"];
        document.getElementById("audio_transcription").innerText = objEpigrapheCourante.AUDIO["TRANSCRIPTION"];

        if (localStorage.id_personnage) {
            document.getElementById("zoneAuncuneEnqueteEnCours").setAttribute("hidden", "true");
            document.getElementById("zoneEnqueteEnCours").removeAttribute("hidden");
        } else {
            document.getElementById("zoneAuncuneEnqueteEnCours").removeAttribute("hidden");
            document.getElementById("zoneEnqueteEnCours").setAttribute("hidden", "true");
        }


        let intNbTrouve = 0;
        if (localStorage.personnage_est_trouve == "true") {
            intNbTrouve++;
        }
        if (localStorage.objet_est_trouve == "true") {
            intNbTrouve++;
        }
        if (localStorage.lieu_est_trouve == "true") {
            intNbTrouve++;
        }
        if (intNbTrouve <= 1) {
            document.getElementById("progressionEnquete").innerHTML = `(${intNbTrouve} indice sur 3)`
        }
        else {
            document.getElementById("progressionEnquete").innerHTML = `(${intNbTrouve} indices sur 3)`
        }
        intNbTrouve = 0;
    },

    /**
     * Méthode permettant de valider si un bouton radio a été cocher, de savoir si celui-ci est le bon et d'afficher un message en conséquence
    */
    validerPieceConviction() {
        const intIdFicheCourante = obtenirValeurUrlParam('id');
        const objReponse = {
            'personnage': localStorage.id_personnage,
            'objet': localStorage.id_objet,
            'lieu': localStorage.id_lieu,
        };

        const refRadioCocher = document.querySelector('[name=formEnquete]:checked');

        if (refRadioCocher == null) {
            document.getElementById("message").innerHTML = "Veuillez choisir une pièce à conviction.";
        } else {
            if (refRadioCocher && objReponse[refRadioCocher.value] === intIdFicheCourante) {
                document.getElementById("message").innerHTML = `Bravo! Vous avez trouvé « ${objJSONEpigraphes[intIdFicheCourante].MYSTERE.INDICE} ».`;
                localStorage[refRadioCocher.value + "_est_trouve"] = "true";
                if (localStorage.personnage_est_trouve === "true" && localStorage.objet_est_trouve === "true" && localStorage.lieu_est_trouve === "true") {
                    document.getElementById("message").innerHTML = "Bravo! Vous avez résolu l'énigme, vous pouvez maintenant accéder au <a href='../concours/'>concours</a>";
                }
            } else {
                document.getElementById("message").innerHTML = "Désolé. Ce n’est pas la bonne pièce à conviction.";
            }
        }
        objFiche.initialiser();
    }
}

// Écouteurs d'événements
window.addEventListener('load', function () {
    objFiche.initialiser();
});

document.getElementById("btnSoumettre").addEventListener('click', function () {
    event.preventDefault();
    objFiche.validerPieceConviction();
});