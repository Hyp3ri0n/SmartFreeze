import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site, SiteService } from '../../services/sites/site.service';
import { Alarme } from '../../services/alarmes/alarme.service';
import { DeviceService, Telemetry, Device } from '../../services/devices/device.service';
import { HttpService } from '../../services/http/http.service';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { ChartComponent } from '../global/chart/chart.component';
import { LoadingModel } from '../global/loading/loading.model';
import { ChartUtil } from '../global/chart/chart.util';


export enum TrustIndication {
    NONE, LOW, MEDIUM, HIGH, IMINENT
}

export interface HalfDayForecast {
    deviceId: string;
    trustIndication: TrustIndication;
}

export interface ForecastDay  {
    date: string;
    morning: HalfDayForecast;
    afternoon: HalfDayForecast;
}

@Component({
    selector: 'site',
    templateUrl: './app/components/site/site.view.html'
})

export class SiteComponent {
    private siteId : string;
    private site : Site = null;
    private alarmes : Alarme[] = [];
    private humidityDataset : any[];
    private temperatureDataset : any[];
    private period:string;
    private from:Date = new Date();
    private to:Date;
    private forecastSite: ForecastDay[];

    constructor(private router: ActivatedRoute,
        private siteService: SiteService,
        private deviceService: DeviceService,
        private http: HttpService) {

        /* FOR CAST FAKE DATA */
        this.forecastSite = [
            {
                date: "lu",
                morning: { deviceId: "id01", trustIndication: TrustIndication.HIGH },
                afternoon: { deviceId: "id02", trustIndication: TrustIndication.LOW }
            },
            {
                date: "ma",
                morning: { deviceId: "id03", trustIndication: TrustIndication.HIGH },
                afternoon: { deviceId: "id02", trustIndication: TrustIndication.NONE }
            },
            {
                date: "me",
                morning: { deviceId: "id01", trustIndication: TrustIndication.MEDIUM },
                afternoon: { deviceId: "id02", trustIndication: TrustIndication.LOW }
            },
            {
                date: "je",
                morning: { deviceId: "id04", trustIndication: TrustIndication.IMINENT },
                afternoon: { deviceId: "id02", trustIndication: TrustIndication.LOW }
            },
            {
                date: "ve",
                morning: { deviceId: "id01", trustIndication: TrustIndication.NONE},
                afternoon: { deviceId: "id02", trustIndication: TrustIndication.LOW }
            }
        ];
        console.log(this.forecastSite);

        this.router.params.subscribe(
            params => {
                this.siteId = params['id'];
            }
        );
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
        this.siteService.getSite(this.siteId).subscribe(
            site => {
                this.site = site;
                // Get alarmes from devices
                // Get devices records for charts
                let subscribes : Observable<Telemetry[]>[] = [];
                this.site.devices.forEach(device => {
                    subscribes.push(this.deviceService.getTelemetry(device.id, this.from, this.to));
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
                            let device : string = '';
                            telemDevice.forEach(telemetry => {
                                device = telemetry.deviceId;
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
                                label: device,
                                borderColor: color,
                                pointBackgroundColor: color,
                                pointBorderColor: color,
                                fill: false,
                                showLine: true
                            });
                            this.humidityDataset.push({
                                data: tmpHumidity,
                                label: device,
                                borderColor: color,
                                pointBackgroundColor: color,
                                pointBorderColor: color,
                                fill: false,
                                showLine: true
                            });
                        });
                    }
                );
            }
        );
    }

    public showCaract():void {
        let elmtCaract = document.getElementById("caracteristiques");
        let elmtMeteo = document.getElementById("meteo");

        elmtMeteo.style.display = "none";
        elmtCaract.style.display = "block";

    }

    public showMeteo(): void {
        let elmtCaract = document.getElementById("caracteristiques");
        let elmtMeteo = document.getElementById("meteo");

        elmtMeteo.style.display = "block";
        elmtCaract.style.display = "none";
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
