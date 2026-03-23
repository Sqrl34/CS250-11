import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome';
import { DashBoardComponent } from './dashboard/dashboard';
import { RoleSelectionComponent } from './role-selection/role-selection';
import { authGuard } from './guard/auth';
import { guestGuard } from './guard/guest';

export const routes: Routes = [
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'welcome', component: WelcomeComponent, canActivate: [guestGuard]},
    {path: 'role-selection', component: RoleSelectionComponent, canActivate: [authGuard]},
    {path: 'dashboard', component: DashBoardComponent, canActivate: [authGuard]},
];
