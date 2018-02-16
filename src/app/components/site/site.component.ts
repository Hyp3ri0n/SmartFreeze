import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site, SiteService } from '../../services/sites/site.service';
import { Alarme, AlarmeService } from '../../services/alarmes/alarme.service';
import { DeviceService, Telemetry, Device } from '../../services/devices/device.service';
import { HttpService } from '../../services/http/http.service';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { ChartComponent } from '../global/chart/chart.component';
import { LoadingModel } from '../global/loading/loading.model';
import { ChartUtil } from '../global/chart/chart.util';
import { PrevisionsService, ForecastDay, ForecastWeek } from '../../services/previsions/previsions.service';
import { WeatherSettings, TemperatureScale, ForecastMode, WeatherLayout } from 'angular-weather-widget';


@Component({
    selector: 'site',
    templateUrl: './app/components/site/site.view.html'
})

export class SiteComponent {
    private siteId: string;
    private site: Site = null;
    private alarmes: Alarme[] = [];
    private humidityDataset: any[];
    private temperatureDataset: any[];
    private period: string;
    private from: Date = new Date();
    private to: Date;
    private forecastSite: ForecastDay[];
    private forecastWeek: ForecastWeek;
    private settings: WeatherSettings = null;
    private devicesName: any[];

    constructor(private router: ActivatedRoute,
        private siteService: SiteService,
        private deviceService: DeviceService,
        private previsionsService: PrevisionsService,
        private alarmeService: AlarmeService,
        private http: HttpService) {

        this.router.params.subscribe(
            params => {
                this.siteId = params['id'];
            }
        );
        this.devicesName = [];
        this.to = new Date();
        this.to.setHours(23, 59, 59, 999);
        this.changedPeriod('day');
    }

    public ngOnInit(): void {
        this.getData();
        this.http.backOnlineEventListener = { component: 'SiteComponent', cb: () => this.getData() };
    }

    public ngOnDestroy(): void {
        this.http.removeBackOnlineListener('SiteComponent');
    }

    private getData(): void {

        this.previsionsService.getPrevisionsForSite(this.siteId).subscribe(
            previsions => {
                this.forecastWeek = previsions;
                this.forecastSite = this.forecastWeek.forecast;
            }
        );

        this.siteService.getSite(this.siteId).subscribe(
            site => {
                this.site = site;
                // Get alarmes from devices
                this.alarmes = null;
                this.alarmeService.getAlarmesWithMoreInfoByDevices(this.site.devices).subscribe(
                    alarmes => {
                        this.alarmes = alarmes;
                    }
                );
                // Get devices records for charts
                let subscribes: Observable<Telemetry[]>[] = [];
                this.site.devices.forEach(device => {
                    subscribes.push(this.deviceService.getTelemetry(device.id, this.from, this.to));
                });
                //get devices name
                this.site.devices.forEach(device => {
                    this.devicesName[device.id] = device.name;
                });
                // destroy chart component
                this.temperatureDataset = null;
                this.humidityDataset = null;
                Observable.forkJoin(subscribes).subscribe(
                    telemetriesTab => {
                        this.temperatureDataset = [];
                        this.humidityDataset = [];
                        telemetriesTab.forEach(telemDevice => {
                            let tmpTemperatures = [];
                            let tmpHumidity = [];
                            let deviceId: string = '';
                            telemDevice.forEach(telemetry => {
                                deviceId = telemetry.deviceId;
                                tmpTemperatures.push({
                                    x: new Date(telemetry.occuredAt),
                                    y: telemetry.temperature
                                });
                                tmpHumidity.push({
                                    x: new Date(telemetry.occuredAt),
                                    y: telemetry.humidity
                                });
                            });
                            let color = ChartUtil.getRandomColor();
                            this.temperatureDataset.push({
                                data: tmpTemperatures,
                                label: this.devicesName[deviceId],
                                borderColor: color,
                                pointBackgroundColor: color,
                                pointBorderColor: color,
                                fill: false,
                                showLine: true
                            });
                            this.humidityDataset.push({
                                data: tmpHumidity,
                                label: this.devicesName[deviceId],
                                borderColor: color,
                                pointBackgroundColor: color,
                                pointBorderColor: color,
                                fill: false,
                                showLine: true
                            });

                            console.log(this.humidityDataset);
                            console.log(this.temperatureDataset);
                        });
                    }
                );

                // Meteo Manager
                this.settings = {
                    location: {
                        latLng: {
                            lat: this.site.latitude,
                            lng: this.site.longitude
                        }
                    },
                    backgroundColor: 'transparent',
                    color: 'rgb(61, 61, 61)',
                    width: 'auto',
                    height: 'auto',
                    showWind: false,
                    scale: TemperatureScale.CELCIUS,
                    forecastMode: ForecastMode.GRID,
                    showDetails: false,
                    showForecast: true,
                    layout: WeatherLayout.NARROW,
                    language: 'fr'
                };
            }
        );
    }

    public showCaract(): void {
        let elmtCaract = document.getElementById("caracteristiques");
        let elmtMeteo = document.getElementById("meteo");

        elmtMeteo.style.display = "none";
        elmtCaract.style.display = "block";

    }

    public showMeteo(): void {
        let elmtCaract = document.getElementById("caracteristiques");
        let elmtMeteo = document.getElementById("meteo");

        elmtMeteo.style.display = "flex";
        elmtCaract.style.display = "none";
    }

    //event on select change
    private reloadChart(period) {
        this.changedPeriod(period);
        this.getData();
    }

    private changedPeriod(value): void {
        let newValues = ChartUtil.getFirstDayOfPeriod(value);
        this.from = newValues.date;
        this.period = newValues.period;
    }

    private hasHumidityData(): boolean {
        let humidityData: boolean = false;
        if (this.humidityDataset != null) {
            this.humidityDataset.forEach(hum => {
                if (hum.data.length !== 0) {
                    humidityData = true;
                }
            });
        }
        return humidityData;
    }

    private hasTemperatureData(): boolean {
        let tempData: boolean = false;
        if (this.temperatureDataset != null) {
            this.temperatureDataset.forEach(tp => {
                if (tp.data.length !== 0) {
                    tempData = true;
                }
            });
        }
        return tempData;
    }
}
