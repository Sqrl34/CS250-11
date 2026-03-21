import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome';
import { DashBoardComponent } from './dashboard/dashboard';
import { authGuard } from './guard/auth';
import { guestGuard } from './guard/guest';

export const routes: Routes = [
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'welcome', component: WelcomeComponent, canActivate: [guestGuard]},
    {path: 'dashboard', component: DashBoardComponent, canActivate: [authGuard]},
];
