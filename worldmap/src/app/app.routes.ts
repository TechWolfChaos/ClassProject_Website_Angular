import { Routes } from '@angular/router';
import { HomeMapComponent } from './home-map/home-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path:'home-map', component: HomeMapComponent},
    { path: '**', component: PageNotFoundComponent},
    // Automatically redirecting from default URL to map page URL
    { path: '', redirectTo: '/home-map', pathMatch: 'full'}
];
