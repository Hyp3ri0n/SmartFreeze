import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService, Device } from '../../services/devices/device.service';
import { ChartUtil } from '../global/chart/chart.util';
import { HttpService } from '../../services/http/http.service';
import { PrevisionsService, ForecastDay, ForecastWeek } from '../../services/previsions/previsions.service';
import { Alarme, AlarmeService } from '../../services/alarmes/alarme.service';
import { SiteService, Site } from '../../services/sites/site.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'sensor',
    templateUrl: './app/components/sensor/sensor.view.html'
})

export class SensorComponent {

    private deviceId: string;
    private device : Device = null;
    private humidityDataset : any[];
    private temperatureDataset : any[];
    private pressureDataset : any[];
    private period:string;
    private from:Date = new Date();
    private to:Date;
    private forecastSite: ForecastDay[];
    private forecastWeek: ForecastWeek;
    private alarmes : Alarme[] = [];
    private sites: Site[] = [];

    constructor(private router : ActivatedRoute,
        private deviceService : DeviceService,
        private previsionsService : PrevisionsService,
        private alarmeService : AlarmeService,
        private siteService : SiteService,
        private http : HttpService) {
        this.router.params.subscribe(
            params => {
                this.deviceId = params['id'];
            }
        );
        this.to = new Date();
        this.to.setHours(23, 59, 59, 999);
        this.changedPeriod('day');
    }

    public ngOnInit(): void {
        this.getData();
        this.http.backOnlineEventListener = { component : 'SensorComponent', cb : () => this.getData()};
    }

    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('SensorComponent');
    }

    private getSiteName(id : string) : string {
        let siteName : string = "";
        this.sites.forEach(site => {
            if (site.id === id) {
                siteName = site.name;
            }
        });
        return siteName;
    }

    private getData() : void {
        this.temperatureDataset = null;
        this.humidityDataset = null;
        this.pressureDataset = null;

        this.previsionsService.getPrevisionsForDevice(this.deviceId).subscribe(
            previsions => {
                this.forecastWeek = previsions;
                this.forecastSite = this.forecastWeek.forecast;
            }
        );

        this.sites = null;
        this.siteService.getSites().subscribe(
            sites => {
                this.sites = sites;
            }
        );

        this.deviceService.getDevice(this.deviceId).subscribe(
            device => {
                this.device = device;
                //Alarms
                this.alarmeService.getAlarmesWithMoreInfoByDevices([this.device]).subscribe(
                    alarmes => {
                        this.alarmes = alarmes;
                    }
                );
                //Charts
                this.deviceService.getTelemetry(this.device.id, this.from, this.to).subscribe(
                    telemetriesTab => {
                        this.temperatureDataset = [];
                        this.humidityDataset = [];
                        this.pressureDataset = [];
                        let tmpTemperatures = [];
                        let tmpHumidity = [];
                        let tmpPressure = [];
                        telemetriesTab.forEach(telemetry => {
                            tmpTemperatures.push({
                                x: new Date(telemetry.occuredAt),
                                y: telemetry.temperature
                            });
                            tmpHumidity.push({
                                x: new Date(telemetry.occuredAt),
                                y: telemetry.humidity
                            });
                            tmpPressure.push({
                                x: new Date(telemetry.occuredAt),
                                y: telemetry.pressure
                            });
                        });
                        let color = ChartUtil.getRandomColor();
                        let tmpOptions = {
                            label: this.device.name,
                            borderColor: color,
                            pointBackgroundColor: color,
                            pointBorderColor: color,
                            fill: false,
                            showLine: true
                        };
                        this.temperatureDataset.push({
                            data: tmpTemperatures,
                            ...tmpOptions
                        });
                        this.humidityDataset.push({
                            data: tmpHumidity,
                            ...tmpOptions
                        });
                        this.pressureDataset.push({
                            data: tmpPressure,
                            ...tmpOptions
                        });
                    }
                );
            }
        );
    }

    //event on select change
    private reloadChart(period) {
        this.changedPeriod(period);
        this.getData();
    }

    private changedPeriod(value) :void {
        let newValues = ChartUtil.getFirstDayOfPeriod(value);
        this.from = newValues.date;
        this.period = newValues.period;
    }
}