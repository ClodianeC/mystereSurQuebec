
// Déclaration de l'objet
const objEnquete = {
    // Attributs
    arrIdsPersonnagesAPiger: ['e0001', 'e0008', 'e0015', 'e0019'],
    arrIdsObjetsAPiger: ['e0002', 'e0004', 'e0007', 'e0021'],
    arrIdsLieuxAPiger: ['e0005', 'e0012', 'e0016', 'e0022'],
    // À compléter
    
    // Méthodes
    /**
     * Vérifie l'état de l'enquête
     *   -Si l'enquête n'est pas débutée:
     *     - Laisse les éléments comme ils le sont dans le fichier HTML de base
     *   -Si l'enquête est débutée:
     *     - Fait apparaître le paragraphe d'indice avec les segments des épigraphes concernés
     *     - Remplace les points d'interrogation par les indice pour personnage objet et lieu
     *     - Remplace "Aucune enquête en cours" par "Enquête en cours"
     *     - Disable le bouton "piger une énigme" et fait apparaître le bouton "piger une nouvelle énigme" et le lien "Chercher des indices"
     *   -Si l'enquête est complétée:
     *     - Fait apparaître le message de félicitation
     *     - Fait apparaître le paragraphe d'indice avec les segments des épigraphes concernés
     *     - Cache le paragraphe d'état de l'enquête
     *     - Fait apparaître le lien pour participer au concours
     *     - Cache le bouton "Piger une nouvelle énigme"
     * Ajoute "(trouvé)" à côté du h3 concerné, si un d'entre eux est trouvé et remplace le "?" par le prénom et nom du personnage
     */
    initialiser: function() {
        if(localStorage.length != 0) {
            // Alors en cours ou complétée
            if(localStorage.personnage_est_trouve === "true" && localStorage.objet_est_trouve === "true" && localStorage.lieu_est_trouve === "true") {
                // Alors complétée
                document.getElementById("zoneEnigme").removeAttribute("hidden");
                document.getElementById("messageEtatEnquete").setAttribute("hidden", true);
                document.getElementById("zoneMessageEnqueteCompletee").removeAttribute("hidden");
                document.getElementById("pigerNouvelEnigme").classList.add("cache");
                document.getElementById("allerConcours").classList.remove("cache");
                
                document.getElementById("texte_personnage").classList.add("debutee");
                document.getElementById("texte_objet").classList.add("debutee");
                document.getElementById("texte_lieu").classList.add("debutee");
            }
            else {
                // Alors en cours
                document.getElementById("personnageSegment").innerText = objJSONEpigraphes[localStorage.id_personnage].MYSTERE.SEGMENT;
                document.getElementById("objetSegment").innerText = objJSONEpigraphes[localStorage.id_objet].MYSTERE.SEGMENT;
                document.getElementById("lieuSegment").innerText = objJSONEpigraphes[localStorage.id_lieu].MYSTERE.SEGMENT;
                document.getElementById("zoneEnigme").removeAttribute("hidden");
                document.getElementById("messageEtatEnquete").removeAttribute("hidden");
                document.getElementById("messageEtatEnquete").innerText = "Enquête en cours"

                document.getElementById("texte_personnage").innerText = objJSONEpigraphes[localStorage.id_personnage].MYSTERE.INDICE;
                document.getElementById("texte_objet").innerText = objJSONEpigraphes[localStorage.id_objet].MYSTERE.INDICE;
                document.getElementById("texte_lieu").innerText = objJSONEpigraphes[localStorage.id_lieu].MYSTERE.INDICE;

                document.getElementById("texte_personnage").classList.add("debutee");
                document.getElementById("texte_objet").classList.add("debutee");
                document.getElementById("texte_lieu").classList.add("debutee");

                document.getElementById("pigerEnigme").setAttribute("disabled", true);
                document.getElementById("pigerNouvelEnigme").classList.remove("cache");
                document.getElementById("allerCarte").classList.remove("cache");
                document.getElementById("allerConcours").classList.add("cache");

                document.querySelector(".picture_personnage").innerHTML = `<source srcset=\'../images/enquete/02_en_cours/${localStorage.id_personnage}_250.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_personnage}_500.jpg 2x\' media=\'(max-width:500px)\'> <source srcset=\'../images/enquete/02_en_cours/${localStorage.id_personnage}_130.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_personnage}_260.jpg 2x\' media=\'(min-width:501px max-width:800px)\' <source srcset=\'../images/enquete/02_en_cours/${localStorage.id_personnage}_250.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_personnage}_500.jpg 2x\' media=\'(min-width:801px)\'> <img class=\'img_personnage\' src=\'../images/enquete/02_en_cours/${localStorage.id_personnage}_250.jpg\' alt=\"Silhouette d\'un personnage\">`
                document.querySelector(".picture_objet").innerHTML = `<source srcset=\'../images/enquete/02_en_cours/${localStorage.id_objet}_250.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_objet}_500.jpg 2x\' media=\'(max-width:500px)\'> <source srcset=\'../images/enquete/02_en_cours/${localStorage.id_objet}_130.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_objet}_260.jpg 2x\' media=\'(min-width:501px max-width:800px)\' <source srcset=\'../images/enquete/02_en_cours/${localStorage.id_objet}_250.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_objet}_500.jpg 2x\' media=\'(min-width:801px)\'> <img class=\'img_personnage\' src=\'../images/enquete/02_en_cours/${localStorage.id_objet}_250.jpg\' alt=\"Silhouette d\'un objet\">`
                document.querySelector(".picture_lieu").innerHTML = `<source srcset=\'../images/enquete/02_en_cours/${localStorage.id_lieu}_250.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_lieu}_500.jpg 2x\' media=\'(max-width:500px)\'> <source srcset=\'../images/enquete/02_en_cours/${localStorage.id_lieu}_130.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_lieu}_260.jpg 2x\' media=\'(min-width:501px max-width:800px)\' <source srcset=\'../images/enquete/02_en_cours/${localStorage.id_lieu}_250.jpg 1x, ../images/enquete/02_en_cours/${localStorage.id_lieu}_500.jpg 2x\' media=\'(min-width:801px)\'> <img class=\'img_personnage\' src=\'../images/enquete/02_en_cours/${localStorage.id_lieu}_250.jpg\' alt=\"Silhouette d\'une victime\">`
            }
        }
        //Alors pas débutée
        
        if(localStorage.personnage_est_trouve == "true") {
            // document.getElementById("personnageMessageTrouve").removeAttribute("hidden");
            document.querySelector(".picture_personnage").innerHTML = `<source srcset=\'../images/enquete/03_completee/${localStorage.id_personnage}_250.jpg 1x, ../images/enquete/03_completee/${localStorage.id_personnage}_500.jpg 2x\' media=\'(max-width:500px)\'> <source srcset=\'../images/enquete/03_completee/${localStorage.id_personnage}_130.jpg 1x, ../images/enquete/03_completee/${localStorage.id_personnage}_260.jpg 2x\' media=\'(min-width:501px max-width:800px)\' <source srcset=\'../images/enquete/03_completee/${localStorage.id_personnage}_250.jpg 1x, ../images/enquete/03_completee/${localStorage.id_personnage}_500.jpg 2x\' media=\'(min-width:801px)\'> <img class=\'img_personnage\' src=\'../images/enquete/03_completee/${localStorage.id_personnage}_250.jpg\' alt=\'Portait de ${objJSONEpigraphes[localStorage.id_personnage].PRENOM} ${objJSONEpigraphes[localStorage.id_personnage].NOM}\'>`
            document.getElementById("texte_personnage").innerText = `${objJSONEpigraphes[localStorage.id_personnage].PRENOM} ${objJSONEpigraphes[localStorage.id_personnage].NOM}`;
        }
        if(localStorage.objet_est_trouve == "true") {
            // document.getElementById("objetMessageTrouve").removeAttribute("hidden");
            document.querySelector(".picture_objet").innerHTML = `<source srcset=\'../images/enquete/03_completee/${localStorage.id_objet}_250.jpg 1x, ../images/enquete/03_completee/${localStorage.id_objet}_500.jpg 2x\' media=\'(max-width:500px)\'> <source srcset=\'../images/enquete/03_completee/${localStorage.id_objet}_130.jpg 1x, ../images/enquete/03_completee/${localStorage.id_objet}_260.jpg 2x\' media=\'(min-width:501px max-width:800px)\' <source srcset=\'../images/enquete/03_completee/${localStorage.id_objet}_250.jpg 1x, ../images/enquete/03_completee/${localStorage.id_objet}_500.jpg 2x\' media=\'(min-width:801px)\'> <img class=\'img_personnage\' src=\'../images/enquete/03_completee/${localStorage.id_objet}_250.jpg\' alt=\'Portrait de ${objJSONEpigraphes[localStorage.id_objet].PRENOM} ${objJSONEpigraphes[localStorage.id_objet].NOM}\'>`
            document.getElementById("texte_objet").innerText = `${objJSONEpigraphes[localStorage.id_objet].PRENOM} ${objJSONEpigraphes[localStorage.id_objet].NOM}`;
        }
        if(localStorage.lieu_est_trouve == "true") {
            // document.getElementById("lieuMessageTrouve").removeAttribute("hidden");
            document.querySelector(".picture_lieu").innerHTML = `<source srcset=\'../images/enquete/03_completee/${localStorage.id_lieu}_250.jpg 1x, ../images/enquete/03_completee/${localStorage.id_lieu}_500.jpg 2x\' media=\'(max-width:500px)\'> <source srcset=\'../images/enquete/03_completee/${localStorage.id_lieu}_130.jpg 1x, ../images/enquete/03_completee/${localStorage.id_lieu}_260.jpg 2x\' media=\'(min-width:501px max-width:800px)\' <source srcset=\'../images/enquete/03_completee/${localStorage.id_lieu}_250.jpg 1x, ../images/enquete/03_completee/${localStorage.id_lieu}_500.jpg 2x\' media=\'(min-width:801px)\'> <img class=\'img_personnage\' src=\'../images/enquete/03_completee/${localStorage.id_lieu}_250.jpg\' alt=\'Portrait de ${objJSONEpigraphes[localStorage.id_lieu].PRENOM} ${objJSONEpigraphes[localStorage.id_lieu].NOM}\'>`
            document.getElementById("texte_lieu").innerText = `${objJSONEpigraphes[localStorage.id_lieu].PRENOM} ${objJSONEpigraphes[localStorage.id_lieu].NOM}`;
        }
    },

    /**
     * Pige les numéros d'épigraphe au hazard pour former l'énigme
     * Place les informations dans le localStorage
     */
    demarrerEnquete: function() {
        const strIdPersonnage = this.arrIdsPersonnagesAPiger[Math.floor(Math.random()*this.arrIdsPersonnagesAPiger.length)];
        const strIdObjet = this.arrIdsObjetsAPiger[Math.floor(Math.random()*this.arrIdsObjetsAPiger.length)];
        const strIdLieu = this.arrIdsLieuxAPiger[Math.floor(Math.random()*this.arrIdsLieuxAPiger.length)];

        localStorage.id_personnage = strIdPersonnage ;
        localStorage.id_objet = strIdObjet ;
        localStorage.id_lieu = strIdLieu ;
        localStorage.personnage_est_trouve = false;
        localStorage.objet_est_trouve = false;
        localStorage.lieu_est_trouve = false;

        objEnquete.initialiser();
    },

    /**
     * Rend accessible le bouton "Piger une énigme"
     */
    enableBtnPigerEnigme: function() {
        document.getElementById("pigerEnigme").removeAttribute("disabled");
    }
}


// Déclaration des écouteurs d'événements
// À compléters
window.addEventListener('load', function() {
    objEnquete.initialiser();
})
document.getElementById("pigerEnigme").addEventListener("click", function () {
    objEnquete.demarrerEnquete();
});
document.getElementById("pigerNouvelEnigme").addEventListener("click", function () {
    objEnquete.enableBtnPigerEnigme();
});