import { Component } from '@angular/core';
import { RenderSite } from '../search/renderSite.component';
import { RenderSensor } from '../search/rendersensor.component';

@Component({
    selector: 'alerts',
    templateUrl: './app/components/alerts/alerts.view.html'
})

export class AlertsComponent {

    constructor() { /**/ }
    data = [
        {
            date: "2018-02-08",
            intitule: "Température inhabituelle 25°C",
            sensor: "G2 - Fondoir",
            sensorId: 2,
            hasAlarm: true,
            site: "Refuge du Goûter",
            siteId: 1,
            region: "auvergne-rhone-alpes",
            gravite: 1
        },
        {
            date: "2018-02-07",
            intitule: "Batterie faible",
            sensor: "G2 - Fondoir",
            sensorId: 2,
            hasAlarm: true,
            site: "Refuge du Goûter",
            siteId: 1,
            region: "auvergne-rhone-alpes",
            gravite: 2
        },
        {
            date: "2018-01-07",
            intitule: "Passerelle P1 pas de communication",
            sensor: "N/C",
            sensorId: null,
            hasAlarm: false,
            site: "N/C",
            siteId: null,
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
                        { value: "today", title: "Aujourd'hui"},
                        { value: "week", title: "Semaine"},
                        { value: "month", title: "Mois"},
                        { value: "year", title: "Année"}
                      ],
                    },
                },
                filterFunction(cell?: string, search?: string): boolean {
                    var dateCell = new Date(cell);
                    var date = new Date();
                    date.setHours(0, 0, 0, 0);
                    switch (search) {
                        case "today": {
                            if (dateCell >= date) {
                                return true;
                            }
                            break;
                        }
                        case "week": {
                            var day = date.getDay();
                            var mondayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - day );
                            if (dateCell >= mondayOfWeek) {
                                return true;
                            }
                           break;
                        }
                        case "month": {
                            var y = date.getFullYear(), m = date.getMonth();
                            var firstDay = new Date(y, m, 1);
                            if (dateCell >= firstDay) {
                                return true;
                            }
                            break;
                         }
                         case "year": {
                            var y = date.getFullYear();
                            var firstDay = new Date(y, 1, 1);
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
            sensor: {
                title: 'Capteur',
                type: 'custom',
                renderComponent: RenderSensor
            },
            site: {
                title: 'Site',
                type: 'custom',
                renderComponent: RenderSite
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