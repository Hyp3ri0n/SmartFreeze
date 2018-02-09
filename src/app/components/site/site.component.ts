import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site, SiteService } from '../../services/sites/site.service';
import { Alarme } from '../../services/alarmes/alarme.service';

@Component({
    selector: 'site',
    templateUrl: './app/components/site/site.view.html'
})

export class SiteComponent {
    private site : Site = null;
    private alarmes : Alarme[] = [];

    constructor(private router : ActivatedRoute, private siteService : SiteService) {
        this.router.params.subscribe(
            params => {
                let siteId : string = params['id'];

                this.siteService.getSite(siteId).subscribe(
                    site => {
                        this.site = site;
                        // Get alarames from devices
                    }
                );
            }
        );
    }
}