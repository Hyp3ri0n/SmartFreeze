import { Component } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';

@Component({
    selector: 'search',
    templateUrl: './app/components/search/search.view.html'
})

export class SearchComponent {

    constructor() { /**/ }

    settings = {
        actions: false,
        columns: {
            capteur: {
                title: 'Capteur'
            },
            site: {
                title: 'Site'
            },
            etat: {
                title: 'Etat'
            },
            favori: {
                title: 'Favori',
                filter: {
                    type: 'checkbox',
                    config: {
                        true: 'Oui',
                        false: 'Non',
                        resetText: 'Vider',
                      },
                }
            },
            avertissments: {
                title: 'Nb avertissements'
            },
            region: {
                title: 'Région',
                filter: {
                    type: 'list',
                    config: {
                      selectText: 'Select...',
                      list: [
                        { title:"Auvergne-Rh\u00f4ne-Alpes", value: "auvergne-rhone-alpes"},
                        { title:"Bourgogne-Franche-Comt\u00e9", value: "bourgogne-franche-comte"},
                        { title: "Bretagne", value:"bretagne"},
                        { title: "Centre-Val de Loire", value:"centre-val-de-loire"},
                        { title: "Corse", value:"corse"},
                        { title: "Grand Est", value:"grand-est"},
                        { title: "Hauts-de-France", value:"hauts-de-france"},
                        { title: "\u00cele-de-France", value:"ile-de-france"},
                        { title: "Normandie", value:"normandie"},
                        { title: "Nouvelle-Aquitaine", value:"nouvelle-aquitaine"},
                        { title: "Occitanie", value:"occitanie"},
                        { title: "Pays de la Loire", value:"pays-de-la-loire"},
                        { title: "Provence-Alpes-C\u00f4te d'Azur", value:"provence-alpes-cote-d-azur"},
                        { title: "Outre-Mer", value:"outre-mer"}
                      ],
                    },
                  },
            }
        }
      };
    data = [
    {
        capteur: "G2 - Fondoir",
        site: "Refuge du Goûter",
        favori: "Oui",
        avertissments: 42,
        region: "auvergne-rhone-alpes",
        etat: "Activé"
    },
    {
        capteur: "G3 - Fondoir",
        site: "Refuge du Goûter",
        favori: "Non",
        avertissments: 0,
        region: "auvergne-rhone-alpes",
        etat: "Activé"
    },
    {
        capteur: "G5 - Dortoir 1",
        site: "Refuge du Goûter",
        favori: "Non",
        avertissments: 422,
        region: "auvergne-rhone-alpes",
        etat: "Erreur"
    },
    {
        capteur: "G6 - Dortoir 2",
        site: "Refuge du Goûter",
        favori: "Oui",
        avertissments: 42,
        region: "auvergne-rhone-alpes",
        etat: "Activé"
    },
    {
        capteur: "G7 - Cuisine",
        site: "Refuge du Goûter",
        favori: "Non",
        avertissments: 1,
        region: "auvergne-rhone-alpes",
        etat: "Activé"
    }
    ];
}