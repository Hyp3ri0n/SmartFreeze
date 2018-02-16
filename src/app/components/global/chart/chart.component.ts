import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'chart',
    template: `
        <canvas [id]="'chart-'+type" 
                class="chartjs-render-monitor">
        </canvas>
    `
})
export class ChartComponent implements AfterViewInit {

    @Input() public dataSet:any;
    @Input() public type:string;
    @Input() public period:string;

    private yAxes:any[] = [];
    private chart:Chart;

    constructor() { /**/ }

    public ngAfterViewInit(): void {

        let tmpYAxes = {
            type: 'linear',
            position: 'bottom',
            stacked: true,
            display: true,
        };

        switch (this.type) {
            case "temp": {
                this.yAxes = [{
                    ...tmpYAxes,
                    scaleLabel: {
                        display: true,
                        labelString: 'Température en °C'
                    }
                }];
                break;
            }
            case "humidity": {
                this.yAxes = [{
                    ...tmpYAxes,
                    scaleLabel: {
                        display: true,
                        labelString: 'Humidité en %'
                    },
                    ticks: {
                        beginAtZero:true,
                        max: 100,
                        min: 0,
                        stepSize: 20
                    }
                }];
                break;
            }
            case "pressure": {
                this.yAxes = [{
                    ...tmpYAxes,
                    scaleLabel: {
                        display: true,
                        labelString: 'Pression en Pascal'
                    }
                }];
                break;
            }
            default: {
                break;
            }
        }

        let chartElem = document.getElementById("chart-" + this.type);
        this.chart = new Chart(chartElem, {
            type: 'scatter',
            data: {
                datasets: this.dataSet
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        type: 'time',
                        display: true,
                        time: {
                            isoWeekday: true,
                            unit: this.period,
                            tooltipFormat: 'DD/MM/YYYY HH:mm'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: this.yAxes,
                }
            }
        });
    }
}