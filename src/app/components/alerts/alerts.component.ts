import { Component } from '@angular/core';
import { RenderSite } from '../search/renderSite.component';
import { RenderSensor } from '../search/rendersensor.component';
import { RenderDate } from '../search/renderDate.component';
import { AlarmeService, Alarme, Gravity, Type } from '../../services/alarmes/alarme.service';
import { RenderBoolean } from '../search/renderBoolean.component';
import { SiteService, Site } from '../../services/sites/site.service';
import { DeviceService, Device } from '../../services/devices/device.service';
import { HttpService } from '../../services/http/http.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { RenderType } from './renderType.component';
import { RenderGravity } from './renderGravity.component';

interface AlarmSearch extends Alarme {
    siteName: string;
    deviceName: string;
    siteRegion: string;
}

@Component({
    selector: 'alerts',
    templateUrl: './app/components/alerts/alerts.view.html'
})

export class AlertsComponent implements OnDestroy {

    private siteIds:string[];
    private data:AlarmSearch[];
    private settings:any;
    public gravities:any[];
    public types:any[];

    constructor(private alarmeService : AlarmeService, private http : HttpService) {
        this.getData();
        this.http.backOnlineEventListener = { component : 'AlertsComponent', cb : () => this.getData()};
        this.types = [];
        this.gravities = [];
        Object.keys(AlarmeService.types).forEach(key => {
            if (Number(key) !== 0) {
                let title = AlarmeService.types[Number(key)];
                this.types.push({
                    value: Number(key),
                    title: title
                });
            }
        });
        Object.keys(AlarmeService.gravities).forEach(key => {
            if (Number(key) !== 0) {
                let title = AlarmeService.gravities[Number(key)];
                this.gravities.push({
                    value: Number(key),
                    title: title
                });
            }
        });

        this.settings = {
            actions: false,
            columns: {
                occuredAt: {
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
                                var mondayOfWeek = new Date(date.getFullYear(),
                                                            date.getMonth(),
                                                            date.getDate() + (day === 0 ? -6 : 1) - day );
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
                    },
                    type: 'custom',
                    renderComponent: RenderDate
                },
                shortDescription: {
                    title: 'Intitulé'
                },
                deviceName: {
                    title: 'Capteur',
                    type: 'custom',
                    renderComponent: RenderSensor
                },
                siteName: {
                    title: 'Site',
                    type: 'custom',
                    renderComponent: RenderSite
                },
                gravity: {
                    title: 'Gravité',
                    filter: {
                        type: 'list',
                        config: {
                          selectText: 'Toutes',
                          list: this.gravities
                        },
                    },
                    type: 'custom',
                    renderComponent: RenderGravity
                },
                type: {
                    title: 'Type',
                    filter: {
                        type: 'list',
                        config: {
                          selectText: 'Tous',
                          list: this.types,
                        },
                    },
                    type: 'custom',
                    renderComponent: RenderType
                },
                siteRegion: {
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
                isActive: {
                    title: 'Active',
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'Réinitialiser',
                          },
                    },
                    type: 'custom',
                    renderComponent: RenderBoolean
                }
            },
            noDataMessage: "N/C",
            pager: {
                display: true,
                perPage: 20
            }
        };
    }

    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('AlertsComponent');
    }

    private getData() : void {
        this.alarmeService.getAlarmesWithMoreInfo().subscribe(
            alarmes => {
                this.data = alarmes;
            }
        );
    }
}