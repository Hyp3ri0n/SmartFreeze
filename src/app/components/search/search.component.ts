import { Component } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { RenderSensor } from './rendersensor.component';
import { RenderSite } from './renderSite.component';
import { RenderBoolean } from './renderBoolean.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DeviceService, Device } from '../../services/devices/device.service';
import { HttpService } from '../../services/http/http.service';
import { SiteService } from '../../services/sites/site.service';
import { RenderDate } from './renderDate.component';

interface DeviceSearch extends Device {
    siteName: string;
    siteRegion: string;
}

@Component({
    selector: 'search',
    templateUrl: './app/components/search/search.view.html'
})

export class SearchComponent implements OnDestroy {

    private siteIds:string[];
    private data:any[];
    private settings:any;

    constructor(private siteService : SiteService, private http : HttpService) {
        this.getData();
        this.http.backOnlineEventListener = { component : 'SearchComponent', cb : () => this.getData()};
        this.settings = {
            actions: false,
            columns: {
                name: {
                    title: 'Capteur',
                    type: 'custom',
                    renderComponent: RenderSensor
                },
                siteName: {
                    title: 'Site',
                    type: 'custom',
                    renderComponent: RenderSite
                },
                activeAlarmsCount: {
                    title: 'Min avertissements actifs',
                    filterFunction(cell?: number, search?: number): boolean {
                        if (cell >= search) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                lastCommunication: {
                    title: 'Dernière communication',
                    filter: false,
                    type: 'custom',
                    renderComponent: RenderDate
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
                isFavorite: {
                    title: 'Favori',
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
        this.http.removeBackOnlineListener('SearchComponent');
    }

    private getData() : void {
        this.siteService.getSites().subscribe(
            sites => {
                this.siteIds = [];
                sites.forEach(site => {
                    this.siteIds.push(site.id);
                });
                this.siteService.getSitesWithIds(this.siteIds).subscribe(
                    sites => {
                        this.data = [];
                        sites.forEach(site => {
                            site.devices.forEach(device => {
                                this.data.push({
                                    id : device.id,
                                    name : device.name,
                                    siteId : device.siteId,
                                    isFavorite : device.isFavorite,
                                    lastCommunication : device.lastCommunication,
                                    activeAlarmsCount : device.activeAlarmsCount,
                                    hasActiveAlarms : device.hasActiveAlarms,
                                    latitude : device.latitude,
                                    longitude : device.longitude,
                                    siteName: site.name,
                                    siteRegion: site.region
                                });
                            });
                        });
                    }
                );
            }
        );
    }
}