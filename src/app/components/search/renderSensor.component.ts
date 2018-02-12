import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
        <a routerLink="/sensor" title="Capteur {{renderId}}">{{renderValue}}</a>
        <i *ngIf="hasAlarm" class="gel-icon fa fa-snowflake-o" title="Gel prévu"></i>
    `,
  })

export class RenderSensor implements ViewCell, OnInit {

    renderValue: string;
    renderId: number;
    @Input() value: string;
    @Input() rowData: any;
    ngOnInit() {
      this.renderValue = this.value;
      this.renderId = this.rowData.sensorId;
      this.hasAlarm = this.rowData.hasAlarm;
  }
}