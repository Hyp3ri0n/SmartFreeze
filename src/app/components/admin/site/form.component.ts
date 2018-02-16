import { Component, OnInit, OnDestroy } from '@angular/core';
import { Site, SiteService } from '../../../services/sites/site.service';
import { HttpService } from '../../../services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingModel } from '../../global/loading/loading.model';

@Component({
    selector: 'site-form',
    templateUrl: './app/components/admin/site/form.view.html'
})

export class AdminSiteFormComponent implements OnInit, OnDestroy {

    private modelLoading : LoadingModel = new LoadingModel(-1, null);

    private siteId : string = '';
    private site: Site = null;
    private zones: string[] = [''];

    constructor(private router : ActivatedRoute, private route : Router, private http : HttpService, private siteService : SiteService) {
        this.router.params.subscribe(
            params => {
                this.siteId = params['id'];
            }
        );

        /*this.site = {
            id:"",
            name : "",
            description :  "",
            imageUri :  "",
            department :  "",
            region :  "",
            siteType :  1,
            hasActiveAlarms :  false,
            activeAlarmsCount :  0,
            latitude : 0,
            longitude : 0,
            altitude : 0,
            surfaceArea : 0,
            surfaceAreaUnit : "",
            zones : [],
            devices : []
        };*/
    }

    public ngOnInit() : void {
        this.getData();
        this.http.backOnlineEventListener = {component: 'AdminSiteFormComponent', cb : () => this.getData()};
    }

    public ngOnDestroy() : void {
        this.http.removeBackOnlineListener('AdminSiteFormComponent');
    }

    private getData() : void {
        this.site = null;
        this.siteService.getSite(this.siteId).subscribe(
            site => {
                this.site = site;
                this.zones = this.site.zones;
            }
        );
    }

    public sendModifications(): void {
        this.site.zones = this.zones;
        console.log(this.site);
        this.siteService.setSite(this.site).subscribe(
            sucess => {
                this.route.navigate(['/site'], {replaceUrl: true, queryParams: {id : this.site.id}});
            }
        );
    }

    public deleteSite(): void {
        this.siteService.deleteSite(this.site).subscribe(
            sucess => {
                this.route.navigate(['/admin'], {replaceUrl: true});
            }
        );
    }

    public addZone(): void {
        console.log(this.zones.indexOf(''));
        if (this.zones.indexOf('') === -1) {
            this.zones.push('');
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