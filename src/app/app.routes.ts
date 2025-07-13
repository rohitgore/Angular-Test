import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ViewDetails } from './view-details/view-details';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'view',component:ViewDetails},
    { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page
];
