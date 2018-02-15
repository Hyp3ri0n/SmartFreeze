import { Component } from '@angular/core';
import { Site, SiteService } from '../../../services/sites/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/http/http.service';
import { LoginService } from '../../root/login/login.service';

@Component({
    selector: 'addSite',
    templateUrl: './app/components/admin/site/addSite.view.html'
})

export class AddSiteComponent {

    private siteId : string = '';
    private site: Site;
    private zones: string[] = ['Nouvelle zone'];

    constructor(private router : ActivatedRoute,
                private route : Router,
                private http : HttpService,
                private siteService : SiteService,
                private login : LoginService) {
        this.site = {
            id:"",
            name : "",
            description :  "",
            image :  "",
            department :  "",
            region :  "",
            siteType :  1,
            hasActiveAlarms :  false,
            activeAlarmsCount :  0,
            latitude : 0,
            longitude : 0,
            altitude : 0,
            surfaceArea : 0,
            surfaceAreaUnit : this.login.getApplicationContext() === 1 ? 'hectar' : 'm2',
            zones : [],
            devices : []
        };
    }

    public ngOnInit() : void {
        this.getData();
        this.http.backOnlineEventListener = {component: 'AddSiteComponent', cb : () => this.getData()};
    }

    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('AddSiteComponent');
    }

    private getData() : void {
        /**/
    }

    public send_site(): void {
        this.site.zones = this.zones;
        this.siteService.createSite(this.site).subscribe(
            sucess => {
                this.route.navigate(['site', {id: this.site.id}]);
            }
        );
    }

    public addZone(): void {
        if (this.zones.indexOf('Nouvelle zone') === -1) {
            this.zones.push('Nouvelle zone');
        }
    }

    public removeZone(zone: string): void {
        let indexZone = this.zones.indexOf(zone);
        this.zones.splice(indexZone, 1);
    }

    private trackByFn(index: any, item: any) : any {
        return index;
    }
}