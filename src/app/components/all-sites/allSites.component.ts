import { Component } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { SiteService, Site } from '../../services/sites/site.service';
import { HttpService } from '../../services/http/http.service';

interface SiteAllSite extends Site {
    isActive: boolean;
}

@Component({
    selector: 'all-sites',
    templateUrl: './app/components/all-sites/allSites.view.html'
})

export class AllSitesComponent {

    private sites:SiteAllSite[];
    private siteIds:string[];
    private countActives;
    private gelFilter;

    constructor(private siteService : SiteService, private http : HttpService) {
        this.getData();
        this.http.backOnlineEventListener = { component : 'AllSitesComponent', cb : () => this.getData()};
        this.countActives = 2;
        this.gelFilter = false;
    }

    private openAll() : void {
        this.sites.forEach(element => {
            element.isActive = true;
        });
        this.countActives = this.sites.length;
    }
    private closeAll() : void {
        this.sites.forEach(element => {
            element.isActive = false;
        });
        this.countActives = 0;
    }
    private go_clicked(site) : void {
        site.isActive = !site.isActive;
        if (site.isActive) {
            this.countActives ++;
        } else {
            this.countActives --;
        }
    }

    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('AllSitesComponent');
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
                        this.sites = [];
                        sites.forEach(site => {
                            this.sites.push({
                                ...site,
                                isActive: true
                            });
                        });
                    }
                );
            }
        );
    }
}