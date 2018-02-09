import { Component } from '@angular/core';

@Component({
    selector: 'addSite',
    templateUrl: './app/components/admin/site/addSite.view.html'
})

export class AddSiteComponent {

    private zones: string[] = [''];

    constructor() {/**/ }

    public addZone(): void {
        console.log(this.zones.indexOf(''));
        if (this.zones.indexOf('') === -1) {
            this.zones.push('');
        }
        console.log(this.zones);
    }

    public removeZone(zone: string): void {
        let indexZone = this.zones.indexOf(zone);
        this.zones.splice(indexZone, 1);
    }

    trackByFn(index: any, item: any) {
        return index;
     }
}