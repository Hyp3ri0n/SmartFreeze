import { Component } from '@angular/core';

@Component({
    selector: 'alerts',
    templateUrl: './app/components/alerts/alerts.view.html'
})

export class AlertsComponent {

    constructor() { /**/ }

    settings = {
        actions: false,
        columns: {
            date: {
                title: 'Date avertissement'
            },
            intitule: {
                title: 'Intitulé'
            },
            capteur: {
                title: 'Capteur'
            },
            site: {
                title: 'Site'
            },
            etat: {
                title: 'Etat'
            },
            gravite: {
                title: 'Gravité',
                filter: {
                    type: 'list',
                    config: {
                      selectText: 'Select...',
                      list: [
                        { title:1, value: 1},
                        { title:2, value: 2},
                        { title:3, value:3}
                      ],
                    },
                  },
            }
        }
      };
    data = [
    {
        date: "07/02/2017 - 13h40",
        intitule: "Température inhabituelle 25°C",
        capteur: "G2 - Fondoir",
        site: "Refuge du Goûter",
        region: "auvergne-rhone-alpes",
        gravite: 1
    },
    {
        date: "07/02/2017 - 13h40",
        intitule: "Batterie faible",
        capteur: "G2 - Fondoir",
        site: "Refuge du Goûter",
        region: "auvergne-rhone-alpes",
        gravite: 2
    },
    {
        date: "07/02/2017 - 13h40",
        intitule: "Passerelle P1 pas de communication",
        capteur: "N/C",
        site: "N/C",
        region: "auvergne-rhone-alpes",
        gravite: 3
    }
    ];
}