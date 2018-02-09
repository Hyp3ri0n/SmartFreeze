import { Component } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'all-sites',
    templateUrl: './app/components/all-sites/allSites.view.html'
})

export class AllSitesComponent {

    private sites:Site[];
    private filteredSites:Site[];
    private countActives;
    private gelFilter;

    constructor() {
        this.sites = [
            {
                title : "Refuge du Goûter",
                isActive: false,
                hasAlarm: true
            },
            {
                title : "Refuge du Couvercle",
                isActive: false,
                hasAlarm: false
            },
            {
                title : "Refuge Laval",
                isActive: false,
                hasAlarm: false
            },
            {
                title : "Refuge du Truc",
                isActive: false,
                hasAlarm: false
            },
            {
                title : "Refuge du Charbournéou",
                isActive: false,
                hasAlarm: true
            }
        ];
        this.countActives = 0;
        this.gelFilter = false;
        this.filteredSites = this.sites;
    }

    private openAll() : void {
        this.filteredSites.forEach(element => {
            element.isActive = true;
        });
        this.countActives = this.filteredSites.length;
    }
    private closeAll() : void {
        this.filteredSites.forEach(element => {
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
}

export interface Site {
    isActive: boolean;
    title: string;
    hasAlarm: boolean;
}