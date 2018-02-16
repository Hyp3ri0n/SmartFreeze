import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpService, MethodRequest } from '../../services/http/http.service';
import { SiteService } from '../../services/sites/site.service';
import { MeteoService, Meteo } from '../../services/meteo/meteo.service';
import { WeatherSettings, TemperatureScale, ForecastMode, WeatherLayout } from 'angular-weather-widget';

@Component({
    selector: 'sf-test',
    template: `
        <div>
            <weather-widget *ngIf="settings != null" [settings]="settings"></weather-widget>
        </div>
    `
})
export class TestComponent implements OnInit {

    private settings : WeatherSettings = null;

    constructor(private http : HttpService, private site : SiteService, private meteo : MeteoService) { /**/ }

    public ngOnInit(): void {
        this.site.getSites().subscribe(
            sites => {
                this.meteo.getMeteoFromSite(sites[0]).subscribe(
                    meteo => console.log(meteo)
                );
                this.meteo.getForecastMeteoFromSite(sites[0]).subscribe(
                    meteo => console.log(meteo)
                );
                this.settings = {
                    location: {
                      latLng : {
                          lat : sites[0].latitude,
                          lng : sites[0].longitude
                      }
                    },
                    backgroundColor: 'transparent',
                    color: '#000000',
                    width: 'auto',
                    height: 'auto',
                    showWind: false,
                    scale: TemperatureScale.CELCIUS,
                    forecastMode: ForecastMode.DETAILED,
                    showDetails: false,
                    showForecast: true,
                    layout: WeatherLayout.NARROW,
                    language: 'fr'
                };
            }
        );
    }
}