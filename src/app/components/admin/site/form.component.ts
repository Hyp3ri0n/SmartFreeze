import { Component } from '@angular/core';
import { Site } from '../../../services/sites/site.service';

@Component({
    selector: 'site-form',
    templateUrl: './app/components/admin/site/form.view.html'
})

export class AdminSiteFormComponent {

    private site: Site;
    private zones: string[] = [''];

    constructor() {
        this.site = {
            id:"",
            name : "",
            description :  "",
            imageUri :  "",
            department :  "",
            region :  "",
            siteType :  1,
            hasActiveAlarms :  false,
            activeAlarmsCount :  0,
            latitude : 0,
            longitude : 0,
            surfaceArea : 0,
            surfaceAreaUnit : "",
            zones : [],
            devices : []
        };
    }

    public sendModifications(): void {
        this.site.zones = this.zones;
        console.log(this.site);
    }

    public addZone(): void {
        console.log(this.zones.indexOf(''));
        if (this.zones.indexOf('') === -1) {
            this.zones.push('');
        }
    }

    public removeZone(zone: string): void {
        let indexZone = this.zones.indexOf(zone);
        this.zones.splice(indexZone, 1);
    }

    trackByFn(index: any, item: any) {
        return index;
     }

}