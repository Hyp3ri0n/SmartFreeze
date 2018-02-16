import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
        <a [routerLink]="'/sensor/'+renderId" title="Capteur {{renderId}}">{{renderValue}}</a>
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
        if ("deviceId" in this.rowData) {
            this.renderId = this.rowData.deviceId;
        } else {
            this.renderId = this.rowData.id;
        }
        if ("hasActiveAlarms" in this.rowData) {
            this.hasAlarm = this.rowData.hasActiveAlarms;
        } else {
            this.hasAlarm = false;
        }
    }
}