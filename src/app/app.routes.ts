import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test-chart/test.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'test', component: TestComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full'}
];