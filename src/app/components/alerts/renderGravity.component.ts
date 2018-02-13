import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { AlarmeService } from '../../services/alarmes/alarme.service';

@Component({
    template: `
        {{renderValue}}
    `,
})

export class RenderGravity implements ViewCell, OnInit {

    renderValue: string;
    @Input() value: string;
    @Input() rowData: any;
    ngOnInit() {
        console.log(this.value);
        this.renderValue = AlarmeService.gravities[Number(this.value)];
  }
}