import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
        {{renderValue}}
    `,
})

export class RenderDate implements ViewCell, OnInit {

    renderValue: string;
    @Input() value: string;
    @Input() rowData: any;
    ngOnInit() {
      this.renderValue = new Date(this.value).toLocaleString();
  }
}