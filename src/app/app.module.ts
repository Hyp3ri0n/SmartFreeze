import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routes';
import { AppComponent } from './components/root/app.component';
import { HeaderComponent } from './components/root/header/header.component';
import { SidebarComponent } from './components/root/sidebar/sidebar.component';
import { FooterComponent } from './components/root/footer/footer.component';
import { SplashScreenComponent } from './components/root/splashScreen/splashScreen.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [{provide: APP_BASE_HREF, useValue: '#'}],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SplashScreenComponent,
    HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}