import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { appRoutes } from './app.routes';
import { AppComponent } from './components/root/app.component';
import { HeaderComponent } from './components/root/header/header.component';
import { SidebarComponent } from './components/root/sidebar/sidebar.component';
import { FooterComponent } from './components/root/footer/footer.component';
import { SplashScreenComponent } from './components/root/splashScreen/splashScreen.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/home/map/map.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchComponent } from './components/search/search.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { TestComponent } from './components/test-chart/test.component';
import { SiteComponent } from './components/site/site.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpService } from './services/http/http.service';
import { LoginService } from './components/root/login/login.service';
import { LoginComponent } from './components/root/login/login.component';
import { AdminSensorFormComponent } from './components/admin/sensor/form.component';
import { AdminSensorListComponent } from './components/admin/sensor/list.component';
import { AdminSiteFormComponent } from './components/admin/site/form.component';
import { AdminSiteListComponent } from './components/admin/site/list.component';
import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { DeviceService } from './services/devices/device.service';
import { SiteService } from './services/sites/site.service';
import { LoadingComponent } from './components/global/loading/loading.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCJVLgZMjujdJhvWfcV12kxSZu01ZL8MHw'}),
    AgmSnazzyInfoWindowModule,
    Ng2SmartTableModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '#'},
    HttpService,
    LoginService,
    DeviceService,
    SiteService
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SplashScreenComponent,
    HomeComponent,
    MapComponent,
    AdminComponent,
    SearchComponent,
    AlertsComponent,
    TestComponent,
    SiteComponent,
    SensorComponent,
    LoginComponent,
    AdminSensorFormComponent,
    AdminSensorListComponent,
    AdminSiteFormComponent,
    AdminSiteListComponent,
    ClickOutsideDirective,
    LoadingComponent
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
