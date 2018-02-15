import { Component, OnDestroy } from '@angular/core';
import { Alarme, AlarmeService } from '../../../services/alarmes/alarme.service';
import { HttpService } from '../../../services/http/http.service';
import { Site, SiteService } from '../../../services/sites/site.service';
import { DeviceService, Device } from '../../../services/devices/device.service';
//import { ElementRef } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './app/components/root/header/header.view.html',
})

export class HeaderComponent implements OnDestroy {
    private show: string = 'none';
    private sites: Site[] = [];
    private devices: Device[] = [];
    public filteredSitesAutoComplete: Site[] = [];
    public filteredDevicesAutoComplete: Device[] = [];
    public query: string = "";
    private focusInput: boolean = false;

    private alarmes: Alarme[] = [];

    // tslint:disable-next-line:max-line-length
    constructor(private siteService: SiteService, private deviceService: DeviceService, private alarme: AlarmeService, private http: HttpService) {
        this.getData();
        this.http.backOnlineEventListener = { component: 'HeaderComponent', cb: () => this.getData() };
    }

    private filterListAutoComplete(): void {
        if (this.query !== "") {
            this.filteredSitesAutoComplete = this.sites.filter(function (el: Site) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            this.filteredDevicesAutoComplete = this.devices.filter(function (el: Device) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            let elmtAutoComplete = document.getElementById("autoCompletePlace");
            elmtAutoComplete.style.display = "block";
        } else {
            this.filteredSitesAutoComplete = [];
            this.filteredDevicesAutoComplete = [];
        }
    }

    private setAlerteAsView(id : string) : void {
        this.alarme.setAlarmeAsView(id).subscribe(
            sucess => {
               this.getData();
            }
        );
    }

    private deleteItem(): void {
        this.query = "";
    }

    private selectItem(item: string): void {
        this.query = item;
        this.filteredSitesAutoComplete = [];
        this.filteredDevicesAutoComplete = [];
        let elmtAutoComplete = document.getElementById("autoCompletePlace");
        elmtAutoComplete.style.display = "none";
    }

    /*
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
             this.filteredListAutoComplete = [];
         }
     }*/

    public ngOnDestroy(): void {
        this.http.removeBackOnlineListener('HeaderComponent');
    }

    private getData(): void {
        this.sites = [];
        this.siteService.getSites().subscribe(
            sites => {
                this.sites = sites;
            }
        );
        this.devices = [];
        this.deviceService.getDevices().subscribe(
            devices => {
                this.devices = devices;
            }
        );
        this.alarme.getLastAlarmes().subscribe(
            alarmes => {
                this.alarmes = alarmes;
            }
        );
    }

    private getDeviceByID(id : string) : string {
        let result = "";
        this.devices.forEach(device => {
            if (device.id === id) {
                result = device.name;
            }
        });
        return result;
    }

    private go_clicked(): void {
        if (this.show === 'none') {
            this.show = 'block';
        } else {
            this.show = 'none';
        }
    }
    private close(): void {
        this.show = 'none';
    }
}