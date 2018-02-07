import { Component } from '@angular/core';
import { DeviceService, Device } from '../../services/devices/device.service';

@Component({
    selector: 'home',
    templateUrl: './app/components/home/home.view.html'
})

export class HomeComponent {

    private devices : Device[] = [];

    constructor(private deviceService : DeviceService) {
        this.deviceService.getFavDevices().subscribe(
            devices => {
                this.devices = devices;
            }
        );
    }
}