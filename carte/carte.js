/**
 * @file Démo Google Maps - Création de marqueurs et d'infobulles
 * @author Yves Helie <yves.helie@cegep-ste-foy.qc.ca>
 * @author Pascal Larose (révision)
 * @author Ève (révision)
 * @author Raphaël Paré (révision)
 * @version 1.1.3
 */

// Déclaration d'objet(s)  
const objCarte = {
    // Déclaration des attributs de l'objet (accessibles à toutes les méthodes de l'objet)
    objMap: null,
    arrMarqueurs: [],
    fltLatCentreCarte: 46.811638,
    fltLngCentreCarte: -71.223758,
    strUrlImages: '../images/',
    intZoomCarte: 14,

    /**
     * Permet de créer la carte Google Maps avec des marqueurs
     */
    initialiser: function (strIdCarte) {
        // Création de la carte à l'aide de l'api Google Maps
        this.objMap = new google.maps.Map(document.getElementById(strIdCarte), {
            center: {
                lat: this.fltLatCentreCarte,
                lng: this.fltLngCentreCarte
            },
            scrollwheel: false,
            zoom: this.intZoomCarte
        });
        // demande de création des marqueurs
        this.creerMarqueurs();
    },

    /**
     * Permet de créer tous les marqueurs sur la carte à partir du JSON
     */
    creerMarqueurs: function () {
        // Boucle for qui se répétera tant qu'il y aura
        // des clés de premier niveau (strIdEpigraphe)
        // dans l'objet objJSONEpigraphes
        for (let strIdEpigraphe in objJSONEpigraphes) {
            const objEpigrapheCourant = objJSONEpigraphes[strIdEpigraphe];

            //à compléter en remplaçant toutes les valeurs fixes par celles du json de la fiche actuelle! :
            const strGabaritContenuInfobulle = `<div class="infoBulle">
				<div class="image"><img width="300" src="../images/fiche_perso/${strIdEpigraphe}/lieu_300.jpg"></div>
				<div class="titre texte_image_carte">${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}</div>
				<div class="adresse texte_image_carte">Adresse : ${objEpigrapheCourant.ADRESSE}</div>
				<a class="btn texte_image_carte" href="../fiches/arts-visuels.html?id=${strIdEpigraphe}&titre=${objEpigrapheCourant.PRENOM}-${objEpigrapheCourant.NOM}">Consulter la fiche de ${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}</a>
			</div>`;

            console.log(strGabaritContenuInfobulle);

            const objInfobulle = new google.maps.InfoWindow({
                content: strGabaritContenuInfobulle
            });

            const objMarqueur = new google.maps.Marker({
                position: new google.maps.LatLng(objEpigrapheCourant.LATITUDE, objEpigrapheCourant.LONGITUDE),
                title: objEpigrapheCourant.IMAGE.TITRE,
                map: this.objMap,
                icon: `${this.strUrlImages}marqueurs/lieu.png`,
                infowindow: objInfobulle
            });

            // Ajout de l'écouteur d'événements click qui lancera
            // la fermeture de toutes les infobulles
            // avant d'ouvrir l'infobulle liée au marqueur cliqué
            objMarqueur.addListener('click', function () {
                objCarte.fermerToutesInfobulles();
                this.infowindow.open(objCarte.objMap, this);
            });

            this.arrMarqueurs.push(objMarqueur);
        }
    },

    /**
     * Permet de fermer toute les infobulles de la carte
     */
    fermerToutesInfobulles: function () {
        this.arrMarqueurs.forEach(function (objMarqueur) {
            objMarqueur.infowindow.close();
        });
    }
};

objCarte.initialiser('carte');