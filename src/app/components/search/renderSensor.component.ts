import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
        <a [routerLink]="'/sensor/'+renderId" title="Capteur {{renderId}}">{{renderValue}}</a>
        <i *ngIf="hasAlarm" class="gel-icon fa fa-snowflake-o" title="Gel prévu"></i>
    `,
  })

export class RenderSensor implements ViewCell, OnInit {

    renderValue: string;
    renderId: number;
    hasAlarm: boolean;
    @Input() value: string;
    @Input() rowData: any;
    ngOnInit() {
      this.renderValue = this.value;
      this.renderId = this.rowData.id;
      this.hasAlarm = this.rowData.hasActiveAlarms;
  }
}