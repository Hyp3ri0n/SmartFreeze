import { Component } from '@angular/core';

@Component({
    selector: 'alerts',
    templateUrl: './app/components/alerts/alerts.view.html'
})

export class AlertsComponent {

    constructor() { /**/ }
    data = [
        {
            date: "07/02/2018 - 13h40",
            intitule: "Température inhabituelle 25°C",
            capteur: "G2 - Fondoir",
            site: "Refuge du Goûter",
            region: "auvergne-rhone-alpes",
            gravite: 1
        },
        {
            date: "07/02/2018 - 13h40",
            intitule: "Batterie faible",
            capteur: "G2 - Fondoir",
            site: "Refuge du Goûter",
            region: "auvergne-rhone-alpes",
            gravite: 2
        },
        {
            date: "07/02/2018 - 13h40",
            intitule: "Passerelle P1 pas de communication",
            capteur: "N/C",
            site: "N/C",
            region: "auvergne-rhone-alpes",
            gravite: 3
        }
        ];
    settings = {
        actions: false,
        columns: {
            date: {
                title: 'Date avertissement',
                filter: {
                    type: 'list',
                    config: {
                      selectText: 'Toutes',
                      list: [
                        { value: "today", title: "Today"},
                        { value: "week", title: "Week"},
                        { value: "month", title: "Month"}
                      ],
                    },
                },
                filterFunction(cell?: string, search?: string): boolean {
                    var dateCell = new Date(cell);
                    var date = new Date();
                    switch (search) {
                        case "today": {
                            if (dateCell >= date) {
                                return true;
                            }
                            break;
                        }
                        // case "week": {
                        //     if (dateCell >= date.get) {
                        //         return true;
                        //     }
                        //    break;
                        // }
                        case "month": {
                            var y = date.getFullYear(), m = date.getMonth();
                            var firstDay = new Date(y, m, 1);
                            if (dateCell >= firstDay) {
                                return true;
                            }
                            break;
                         }
                        default: {
                            return false;
                        }
                     }
                     return false;
                }
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
            gravite: {
                title: 'Gravité',
                filter: {
                    type: 'list',
                    config: {
                      selectText: 'Toutes',
                      list: [
                        { title:1, value: 1},
                        { title:2, value: 2},
                        { title:3, value:3}
                      ],
                    },
                  },
            }
        },
        noDataMessage: "N/C",
        pager: {
            display: true,
            perPage: 20
        }
      };
}