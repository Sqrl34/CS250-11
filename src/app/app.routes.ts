import { Routes } from '@angular/router';
import { RoleSelectionComponent } from './role-selection/role-selection';
import { DashBoardComponent } from './dashboard/dashboard';
import { WelcomeComponent } from './welcome/welcome';
import { guestGuard } from './guard/guest';
import { authGuard } from './guard/auth';
import { CreateListing } from './create-listing/create-listing';
export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent, canActivate: [guestGuard] },
  { path: 'role-selection', component: RoleSelectionComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashBoardComponent, canActivate: [authGuard] },
  { path: 'create-listing', component: CreateListing, canActivate: [authGuard] }
];
