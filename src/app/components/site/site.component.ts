import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site, SiteService } from '../../services/sites/site.service';
import { Alarme } from '../../services/alarmes/alarme.service';
import { DeviceService, Telemetry, Device } from '../../services/devices/device.service';
import { HttpService } from '../../services/http/http.service';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


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
    private datasetConfig: any;
    private chartConfig: any;
    private siteId: string;
    private site: Site = null;
    private alarmes: Alarme[] = [];
    private humidityRecords: any[];
    private temperatureRecords: any[];
    private period: string;
    private from: Date = new Date();
    private to: Date;
    private chartTemp: Chart;
    private chartHumidity: Chart;

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
        this.datasetConfig = {
            fill: false,
            showLine: true,
            steppedLine: true
        };
        this.chartConfig = {
            responsive: true,
            spanGaps: true
        };
        this.to = new Date();
        this.to.setHours(23, 59, 59, 999);
        this.period = 'day';
        this.from = this.getFirstDayOfPeriod();


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
                this.temperatureRecords = [];
                this.humidityRecords = [];
                let subscribes: Observable<Telemetry[]>[] = [];
                this.site.devices.forEach(device => {
                    subscribes.push(this.deviceService.getTelemetry(device.id, this.from, this.to));
                });
                Observable.forkJoin(subscribes).subscribe(
                    telemetriesTab => {
                        telemetriesTab.forEach(telemDevice => {
                            let tmpTemperatures = [];
                            let tmpHumidity = [];
                            let dev: string = '';
                            telemDevice.forEach(telemetry => {
                                dev = telemetry.deviceId;
                                tmpTemperatures.push({
                                    x: new Date(telemetry.occuredAt),
                                    y: telemetry.temperature
                                });
                                tmpHumidity.push({
                                    x: new Date(telemetry.occuredAt),
                                    y: telemetry.humidity
                                });
                            });
                            let color = this.getRandomColor();
                            let commonSettings = {
                                label: dev,
                                borderColor: color,
                                pointBackgroundColor: color,
                                pointBorderColor: color,
                            };
                            this.temperatureRecords.push({
                                data: tmpTemperatures,
                                ...commonSettings,
                                ...this.datasetConfig
                            });
                            this.humidityRecords.push({
                                data: tmpHumidity,
                                ...commonSettings,
                                ...this.datasetConfig
                            });
                        });
                        // chart definition
                        if (this.chartTemp) {
                            this.chartTemp.destroy();
                        }
                        if (this.chartHumidity) {
                            this.chartHumidity.destroy();
                        }
                        let ctTemp = document.getElementById("chart-temp");
                        this.chartTemp = new Chart(ctTemp, {
                            type: 'scatter',
                            data: {
                                datasets: this.temperatureRecords
                            },
                            options: {
                                ...this.chartConfig,
                                scales: {
                                    xAxes: [{
                                        type: 'time',
                                        display: true,
                                        time: {
                                            isoWeekday: true,
                                            unit: this.period,
                                            format: 'DD/MM/YYYY HH:mm',
                                            tooltipFormat: 'DD/MM/YYYY HH:mm'
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Date'
                                        }
                                    }],
                                    yAxes: [{
                                        type: 'linear',
                                        position: 'bottom',
                                        stacked: true,
                                        display: true,
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Température en °C'
                                        }
                                    }],
                                }
                            }
                        });
                        let ctHumidity = document.getElementById("chart-humidity");
                        this.chartHumidity = new Chart(ctHumidity, {
                            type: 'scatter',
                            data: {
                                datasets: this.humidityRecords
                            },
                            options: {
                                ...this.chartConfig,
                                scales: {
                                    xAxes: [{
                                        type: 'time',
                                        display: true,
                                        time: {
                                            isoWeekday: true,
                                            unit: this.period,
                                            format: 'DD/MM/YYYY HH:mm',
                                            tooltipFormat: 'DD/MM/YYYY HH:mm'
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Date'
                                        },
                                    }],
                                    yAxes: [{
                                        type: 'linear',
                                        position: 'bottom',
                                        stacked: true,
                                        display: true,
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Humidité en %'
                                        },
                                        ticks: {
                                            beginAtZero: true,
                                            max: 100,
                                            min: 0,
                                            stepSize: 20
                                        }
                                    }],
                                }
                            }
                        });
                    }
                );
            }
        );
    }

    public getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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

        elmtMeteo.style.display = "block";
        elmtCaract.style.display = "none";
    }

    public changeScale(period) {
        this.period = period;
        this.from = this.getFirstDayOfPeriod();
        this.getData();
    }

    private getFirstDayOfPeriod(): Date {
        var date = new Date();
        switch (this.period) {
            //Heure courante
            case "hour": {
                //On change la période afin d'avoir le format adapté
                this.period = 'minute';
                date.setHours(date.getHours() - 1);
                return date;
            }
            //Aujourd'hui
            case "day": {
                this.period = 'hour';
                date.setHours(0, 0, 0, 0);
                return date;
            }
            //Semaine courante
            case "week": {
                this.period = 'day';
                var day = date.getDay();
                return new Date(date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + (day === 0 ? -6 : 1) - day, 0, 0, 0, 0);
            }
            //Mois courant
            case "month": {
                this.period = 'day';
                var y = date.getFullYear(), m = date.getMonth();
                return new Date(y, m, 1, 0, 0, 0, 0);
            }
            //Trimestre courant
            case "quarter": {
                this.period = 'week';
                var quarter = Math.floor((date.getMonth() / 3));
                return new Date(date.getFullYear(), quarter * 3, 1, 0, 0, 0, 0);
            }
            //Année courante
            case "year": {
                this.period = 'week';
                var y = date.getFullYear();
                return new Date(y, 0, 1, 0, 0, 0, 0);
            }
            default: {
                return date;
            }
        }
    }
}