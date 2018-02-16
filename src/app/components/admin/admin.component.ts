import { Component, ElementRef, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { SiteService } from '../../services/sites/site.service';
import { DeviceService, Device } from '../../services/devices/device.service';
import { Site } from '../../services/sites/site.service';

@Component({
    selector: 'search',
    templateUrl: './app/components/admin/admin.view.html'
})

export class AdminComponent implements OnDestroy {

    public querySite : string = '';
    public sites : Site[] = [];
    public filteredListSites : Site[] = [];

    public querySensor : string = '';
    public sensors : Device[] = [];
    public filteredListSensors : Device[] = [];


    constructor(private elementRef: ElementRef,
                private http : HttpService,
                private siteService : SiteService,
                private deviceService : DeviceService) {
        this.getData();
        this.http.backOnlineEventListener = {component: 'AdminComponent', cb : () => this.getData()};
    }


    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('AdminComponent');
    }

    private getData() : void {
        this.deviceService.getDevices().subscribe(
            devices => {
                this.sensors = devices;
            }
        );

        this.siteService.getSites().subscribe(
            sites => {
                this.sites = sites;
            }
        );
    }

    private autocomplete_module() : void {
        console.log('TEST');
    }

    private filterSites() : void {
        if (this.querySite !== '') {
            this.filteredListSites = this.sites.filter(function(el : Site){
                return el.name.toLowerCase().indexOf(this.querySite.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredListSites = [];
        }
    }

    private selectSite(item : string) : void {
        this.querySite = '';
        this.filteredListSites = [];
    }

    private filterSensors() : void {
        if (this.querySensor !== '') {
            this.filteredListSensors = this.sensors.filter(function(el : Device){
                return el.name.toLowerCase().indexOf(this.querySensor.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredListSensors = [];
        }
    }

    private selectSensor(item : string) : void {
        this.querySensor = '';
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