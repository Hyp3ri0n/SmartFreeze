import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpService, MethodRequest } from '../../services/http/http.service';
import { SiteService } from '../../services/sites/site.service';

@Component({
    selector: 'sf-test',
    template: `
        <div>
            <canvas id="test-chart" 
                    style="display: block; width: 1415px; height: 707px;" width="1415" height="707" 
                    class="chartjs-render-monitor">
            </canvas>
        </div>
    `
})
export class TestComponent implements OnInit {

    constructor(private http : HttpService, private site : SiteService) { /**/ }

    public ngOnInit(): void {
        let ctx = document.getElementById("test-chart");
        let myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        let params = {
            'key' : 'AIzaSyCJVLgZMjujdJhvWfcV12kxSZu01ZL8MHw',
            'latlng' : '45.85101,6.830066'
        };

        this.http.request(MethodRequest.GET, 'https://maps.googleapis.com/maps/api/geocode/json', params).subscribe(
            msg => console.log(msg)
        );
    }
}