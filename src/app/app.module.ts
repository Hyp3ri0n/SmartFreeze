import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
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


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCJVLgZMjujdJhvWfcV12kxSZu01ZL8MHw'}),
    AgmSnazzyInfoWindowModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '#'}],
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
    SensorComponent
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
