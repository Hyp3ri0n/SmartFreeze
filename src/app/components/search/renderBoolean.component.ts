import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
        <i class='fa fa-{{renderValue}}' aria-hidden='true'></i>
    `,
})

export class RenderBoolean implements ViewCell, OnInit {

    renderValue: string;
    @Input() value: string;
    @Input() rowData: any;
    ngOnInit() {
      this.renderValue = this.value ? "check" : "times";
  }
}