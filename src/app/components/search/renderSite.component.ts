import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
        <a routerLink="/site" title="Site {{renderId}}">{{renderValue}}</a>
    `,
})

export class RenderSite implements ViewCell, OnInit {

    renderValue: string;
    renderId: number;
    @Input() value: string;
    @Input() rowData: any;
    ngOnInit() {
      this.renderValue = this.value;
      this.renderId = this.rowData.siteId;
  }
}