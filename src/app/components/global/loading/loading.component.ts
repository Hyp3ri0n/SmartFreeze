import { Component, OnInit, Input } from '@angular/core';
import { LoadingModel } from './loading.model';

@Component({
    selector: 'loading',
    templateUrl: './app/components/global/loading/loading.view.html'
})

export class LoadingComponent implements OnInit {

    @Input() model : LoadingModel = new LoadingModel(-1, null);

    constructor() { /**/ }

    public ngOnInit() : void {
        if (this.model.getDuration() === -1) {
            return;
        }
        setTimeout(() => {
            if (this.model.callback != null) {
                this.model.callback();
            }
        }, this.model.getDuration());
    }
}