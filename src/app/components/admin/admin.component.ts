import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './app/components/admin/admin.view.html'
})

export class AdminComponent {

    public querySite : string = '';

    public sites : string[] = ["Corbier", "Apprieu", "Rives", "Grenoble"];

    public filteredListSites : string[] = [];


    constructor(private elementRef: ElementRef) { /**/ }

    private autocomplete_module() : void {
        console.log('TEST');
    }

    private filter() : void {
        if (this.querySite !== "") {
            this.filteredListSites = this.sites.filter(function(el){
                return el.toLowerCase().indexOf(this.querySite.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredListSites = [];
        }
    }

    private select(item : string) : void {
        this.querySite = item;
        this.filteredListSites = [];
    }
}