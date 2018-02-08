import { Component } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';

@Component({
    selector: 'search',
    templateUrl: './app/components/search/search.view.html'
})

export class SearchComponent {

    constructor() { /**/ }

    data = [
        {
            capteur: "G2 - Fondoir",
            site: "Refuge du Goûter",
            favori: "Oui",
            avertissements: 42,
            region: "Auvergne-Rhône-Alpes",
            etat: "Activé"
        },
        {
            capteur: "G3 - Fondoir",
            site: "Refuge du Goûter",
            favori: "Non",
            avertissements: 0,
            region: "Auvergne-Rhône-Alpes",
            etat: "Activé"
        },
        {
            capteur: "G5 - Dortoir 1",
            site: "Refuge du Goûter",
            favori: "Non",
            avertissements: 422,
            region: "Auvergne-Rhône-Alpes",
            etat: "Erreur"
        },
        {
            capteur: "G6 - Dortoir 2",
            site: "Refuge du Goûter",
            favori: "Oui",
            avertissements: 42,
            region: "Auvergne-Rhône-Alpes",
            etat: "Activé"
        },
        {
            capteur: "G7 - Cuisine",
            site: "Refuge du Goûter",
            favori: "Non",
            avertissements: 1,
            region: "Auvergne-Rhône-Alpes",
            etat: "Activé"
        }
        ];

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
                title: 'Etat',
                filter: {
                    type: 'list',
                    config: {
                      selectText: 'Tous',
                      list: [
                        { value: "Activé", title: "Activé"},
                        { value: "Désactivé", title: "Désactivé"},
                        { value: "Erreur", title: "Erreur"},
                      ],
                    },
                  }
            },
            avertissements: {
                title: 'Min avertissements',
                filterFunction(cell?: number, search?: number): boolean {
                    if (cell >= search) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            region: {
                title: 'Région',
                filter: {
                    type: 'list',
                    config: {
                      selectText: 'Toutes',
                      list: [
                        { title: "Auvergne-Rhône-Alpes", value: "Auvergne-Rhône-Alpe"},
                        { title: "Bourgogne-Franche-Comté", value: "Bourgogne-Franche-Comté"},
                        { title: "Bretagne", value:"Bretagne"},
                        { title: "Centre-Val de Loire", value:"Centre-Val de Loire"},
                        { title: "Corse", value:"Corse"},
                        { title: "Grand Est", value:"Grand Est"},
                        { title: "Hauts-de-France", value:"Hauts-de-France"},
                        { title: "Ile-de-France", value:"Ile-de-France"},
                        { title: "Normandie", value:"Normandie"},
                        { title: "Nouvelle-Aquitaine", value:"Nouvelle-Aquitaine"},
                        { title: "Occitanie", value:"Occitanie"},
                        { title: "Pays de la Loire", value:"Pays de la Loire"},
                        { title: "Provence-Alpes-Côte d'Azur", value:"Provence-Alpes-Côte d'Azur"},
                        { title: "Outre-Mer", value:"Outre-Mer"}
                      ],
                    },
                  },
            },
            favori: {
                title: 'Favori',
                filter: {
                    type: 'checkbox',
                    config: {
                        true: 'Oui',
                        false: 'Non',
                        resetText: 'Réinitialiser',
                      },
                }
            }
        },
        noDataMessage: "N/C",
        pager: {
            display: true,
            perPage: 20
        }
      };
}