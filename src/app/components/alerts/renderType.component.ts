import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { AlarmeService } from '../../services/alarmes/alarme.service';

@Component({
    template: `
        {{renderValue}}
    `,
})

export class RenderType implements ViewCell, OnInit {

    renderValue: string;
    @Input() value: string;
    @Input() rowData: any;
    ngOnInit() {
      this.renderValue = AlarmeService.types[Number(this.value)];
  }
}