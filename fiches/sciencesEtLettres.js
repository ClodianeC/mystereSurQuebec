/**
 * Va chercher la valeur du paramètre inscrit dans l'adresse HTML
 * @param {string} strParam 
 * @returns {string}
 */
 function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam);
}

const objFicheSciencesEtLettres = {
    /**
     * Prend les informations à partir du fichier JSON et les place dans les éléments HTML nécéssaires
     * Affiche le nombre d'indices trouvés
     */
    initialiser: function() {
        const intIdFicheCourante = obtenirValeurUrlParam("id");
        const objEpigrapheCourant = objJSONepigraphes[intIdFicheCourante];
        document.querySelector("title").innerText = `${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM} - Mystère sur Québec`;
        document.getElementById("prenom").innerText = objEpigrapheCourant.PRENOM;
        document.getElementById("nom").innerText = ` ${objEpigrapheCourant.NOM}`;
        document.getElementById("url_image").src = `../images/${intIdFicheCourante}_${objEpigrapheCourant.SUFFIXE_IMAGES}.jpg`;
        document.getElementById("url_image").alt = `Portrait de ${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}`;
        document.getElementById("titre_image").innerText = objEpigrapheCourant.IMAGE.TITRE;
        document.getElementById("credit_image").innerText = objEpigrapheCourant.IMAGE.CREDIT;
        document.getElementById("notes_biographiques").innerHTML = `<p>${objEpigrapheCourant.BIOGRAPHIE}</p>`;
        document.getElementById("carteZoom").src = `../images/${intIdFicheCourante}_Lieu_500.jpg`;
        document.getElementById("arrondissement").innerText = objEpigrapheCourant.ARRONDISSEMENT;
        document.getElementById("quartier").innerText = objEpigrapheCourant.QUARTIER;
        document.getElementById("adresse").innerText = objEpigrapheCourant.ADRESSE;
        document.getElementById("url_plaque").src = `../images/${intIdFicheCourante}_plaque.jpg`;
        document.getElementById("transcript").innerText = objEpigrapheCourant.PLAQUE_TRANSCRIPTION;
        document.getElementById("audio_desc").innerText = objEpigrapheCourant.AUDIO.DESCRIPTION;
        document.getElementById("audio_url").src = objEpigrapheCourant.AUDIO.URL;
        document.getElementById("audio_transcription").innerText = objEpigrapheCourant.AUDIO.TRANSCRIPTION;
        document.getElementById("audio_credit").innerText = objEpigrapheCourant.AUDIO.CREDIT;
        if(localStorage.length == 0) {
            document.getElementById("zoneAuncuneEnqueteEnCours").removeAttribute("hidden");
            document.getElementById("zoneEnqueteEnCours").setAttribute("hidden", true);
        }

        let intNbTrouve = 0;
        if(localStorage.personnage_est_trouve == "true") {
            intNbTrouve ++;
        }
        if(localStorage.objet_est_trouve == "true") {
            intNbTrouve ++;
        }
        if(localStorage.lieu_est_trouve == "true") {
            intNbTrouve ++;
        }
        if(intNbTrouve <= 1) {
            document.getElementById("progrssionEnquete").innerHTML = `(${intNbTrouve} indice sur 3)`
        }
        else {
            document.getElementById("progrssionEnquete").innerHTML = `(${intNbTrouve} indices sur 3)`
        }
        intNbTrouve = 0;
    },

    /**
     * Vérifie la réponse choisie par les boutons radio dans les fiches personnages
     * Vérifie si tous les personnage ont été trouvés
     */
    validerPieceConviction: function() {
        const intIdFicheCourante = obtenirValeurUrlParam("id");
        const objReponse = {
            "personnage": localStorage.id_personnage,
            "objet": localStorage.id_objet,
            "lieu": localStorage.id_lieu, 
        };
        const refRadioCoche = document.querySelector("[name=formEnquete]:checked");

        if(localStorage.length == 0){
            document.getElementById("message").innerHTML = "Aucune enquête en cours. Si vous désirez débuter une enquête, visitez la page <a href=../enquete/>«Enquête».</a>"; 
        }
        else{
            if(refRadioCoche && objReponse[refRadioCoche.value] === intIdFicheCourante) {
                document.getElementById("message").innerText = "Bravo! Vous avez trouvé " + objJSONepigraphes[intIdFicheCourante].MYSTERE.INDICE + ".";
                if(localStorage.personnage_est_trouve === "true" && localStorage.objet_est_trouve === "true" && localStorage.lieu_est_trouve === "true") {
                    document.getElementById("message").innerHTML = "Bravo! Vous avez résolu l'énigme, vous pouvez maintenant accéder au <a href='../concours/'>concours</a>" ;
                }
            }
            else {
                if(document.querySelectorAll("[name=formEnquete]:checked").length == 0){
                    document.getElementById("message").innerText = "Veuillez choisir une réponse avant de soumettre.";
                }
                else{
                    document.getElementById("message").innerText = "Désolé. Ce n’est pas la bonne pièce à conviction.";
                }
            } 
        }
    }
}

// Écouteurs d'événements
window.addEventListener("load", function() {
    objFicheSciencesEtLettres.initialiser();
});
document.getElementById("btnSoumettre").addEventListener("click", function() {
    event.preventDefault();
    objFicheSciencesEtLettres.validerPieceConviction();
});