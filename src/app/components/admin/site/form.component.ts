import { Component } from '@angular/core';

export interface Zone {
    id: number;
    name: string;
}

@Component({
    selector: 'site-form',
    templateUrl: './app/components/admin/site/form.view.html'
})

export class AdminSiteFormComponent {

    private zones: Zone[] = [{id: 1, name:"Piece1"}, {id: 2, name:"Piece2"}];

    constructor() {/**/ }

    public addZone(): void {
        this.zones.push({ id: this.zones.length + 1, name: "" });
    }

    public removeZone(idZone: number): void {
        this.zones.splice(idZone, 1);
    }

    public showAddChoice(choice): void {

    }

}