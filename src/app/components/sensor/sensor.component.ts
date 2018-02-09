import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService, Device } from '../../services/devices/device.service';

@Component({
    selector: 'sensor',
    templateUrl: './app/components/sensor/sensor.view.html'
})

export class SensorComponent {

    private device : Device = null;

    constructor(private router : ActivatedRoute, private deviceService : DeviceService) {
        this.router.params.subscribe(
            params => {
                let deviceId : string = params['id'];

                this.deviceService.getDevice(deviceId).subscribe(
                    device => {
                        this.device = device;
                    }
                );
            }
        );
    }
}