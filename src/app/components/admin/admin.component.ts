import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './app/components/admin/admin.view.html'
})

export class AdminComponent {

    public querySite : string = '';
    public sites : string[] = ["Corbier", "Apprieu", "Rives", "Grenoble"];
    public filteredListSites : string[] = [];

    public querySensor : string = '';
    public sensors : string[] = ["Tomates", "Carottes", "Fondoir"];
    public filteredListSensors : string[] = [];


    constructor(private elementRef: ElementRef) { /**/ }

    private autocomplete_module() : void {
        console.log('TEST');
    }

    private filterSites() : void {
        if (this.querySite !== "") {
            this.filteredListSites = this.sites.filter(function(el){
                return el.toLowerCase().indexOf(this.querySite.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredListSites = [];
        }
    }

    private selectSite(item : string) : void {
        this.querySite = item;
        this.filteredListSites = [];
    }

    private filterSensors() : void {
        if (this.querySensor !== "") {
            this.filteredListSensors = this.sensors.filter(function(el){
                return el.toLowerCase().indexOf(this.querySensor.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredListSensors = [];
        }
    }

    private selectSensor(item : string) : void {
        this.querySensor = item;
        this.filteredListSensors = [];
    }

    private handleClick(event) : void {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
           clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
         if (!inside) {
             this.filteredListSensors = [];
             this.filteredListSites = [];
         }
     }
}