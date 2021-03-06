import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchComponent } from './components/search/search.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { TestComponent } from './components/test-chart/test.component';
import { SiteComponent } from './components/site/site.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { AdminSiteFormComponent } from './components/admin/site/form.component';
import { AdminSiteListComponent } from './components/admin/site/list.component';
import { AdminSensorListComponent } from './components/admin/sensor/list.component';
import { AdminSensorFormComponent } from './components/admin/sensor/form.component';
import { AddSiteComponent } from './components/admin/site/addSite.component';
import { AddSensorComponent } from './components/admin/sensor/addSensor.component';
import { AllSitesComponent } from './components/all-sites/allSites.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'alerts', component: AlertsComponent },
    { path: 'admin', component: AdminComponent,
        children: [
            { path: 'site', children: [
                { path: 'list', component: AdminSiteListComponent },
                { path: 'form/:id', component: AdminSiteFormComponent },
                { path: 'new', component: AddSiteComponent }
            ]},
            { path: 'sensor', children: [
                { path: 'list', component: AdminSensorListComponent },
                { path: 'form/:id', component: AdminSensorFormComponent },
                { path: 'new', component: AddSensorComponent }
            ]}
        ]
    },
    { path: 'site/:id', component: SiteComponent },
    { path: 'sensor/:id', component: SensorComponent },
    { path: 'test', component: TestComponent},
    { path: 'allSites', component: AllSitesComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full'}
];