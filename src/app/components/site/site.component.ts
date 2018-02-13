import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site, SiteService } from '../../services/sites/site.service';
import { Alarme } from '../../services/alarmes/alarme.service';
import { DeviceService, Telemetry, Device } from '../../services/devices/device.service';
import { HttpService } from '../../services/http/http.service';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'site',
    templateUrl: './app/components/site/site.view.html'
})

export class SiteComponent {
    private datasetConfig : any;
    private chartConfig : any;
    private siteId : string;
    private site : Site = null;
    private alarmes : Alarme[] = [];
    private humidityRecords : any[];
    private temperatureRecords : any[];
    private granularity:number;

    constructor(private router : ActivatedRoute,
                private siteService : SiteService,
                private deviceService : DeviceService,
                private http : HttpService) {
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
        this.granularity = 1;
    }

    public ngOnInit(): void {
        this.getData();
        this.http.backOnlineEventListener = { component : 'SiteComponent', cb : () => this.getData()};
    }

    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('SiteComponent');
    }

    private getData() : void {
        this.siteService.getSite(this.siteId).subscribe(
            site => {
                this.site = site;
                // Get alarmes from devices
                // Get devices records for charts
                this.temperatureRecords = [];
                this.humidityRecords = [];
                let from = new Date();
                from.setDate(from.getDate() - this.granularity);
                let to = new Date();
                let subscribes : Observable<Telemetry[]>[] = [];
                this.site.devices.forEach(device => {
                    subscribes.push(this.deviceService.getTelemetry(device.id, from, to));
                });
                Observable.forkJoin(subscribes).subscribe(
                    telemetriesTab => {
                        telemetriesTab.forEach(telemDevice => {
                            let tmpTemperatures = [];
                            let tmpHumidity = [];
                            let dev : string = '';
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
                        let ctTemp = document.getElementById("chart-temp");
                        let chartTemp = new Chart(ctTemp, {
                            type: 'scatter',
                            data: {
                                datasets: this.temperatureRecords
                            },
                            options: {
                                ...this.chartConfig,
                                title: {
                                    display: true,
                                    text: 'Température'
                                },
                                scales: {
                                    xAxes: [{
                                        type: 'time',
                                        display: true,
                                        time: {
                                            unit: 'hour'
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
                                            labelString: 'Température'
                                        }
                                    }],
                                }
                            }
                        });
                        let ctHumidity = document.getElementById("chart-humidity");
                        let chartHumidity = new Chart(ctHumidity, {
                            type: 'scatter',
                            data: {
                                datasets: this.humidityRecords
                            },
                            options: {
                                ...this.chartConfig,
                                title: {
                                    display: true,
                                    text: 'Humidité'
                                },
                                scales: {
                                    xAxes: [{
                                        type: 'time',
                                        display: true,
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
                                            labelString: 'Humidité'
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

    public showCaract():void {
        let elmtCaract = document.getElementById("caracteristiques");
        let elmtMeteo = document.getElementById("meteo");

        elmtMeteo.style.display = "none";
        elmtCaract.style.display = "block";

    }

    public showMeteo():void {
        let elmtCaract = document.getElementById("caracteristiques");
        let elmtMeteo = document.getElementById("meteo");

        elmtMeteo.style.display = "block";
        elmtCaract.style.display = "none";

    }
}