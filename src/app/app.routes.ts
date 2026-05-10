

// import { Routes } from '@angular/router';
// import { WelcomeComponent } from './welcome/welcome';
// import { DashBoardComponent } from './dashboard/dashboard';
// import { RoleSelectionComponent } from './role-selection/role-selection';
// import { authGuard } from './guard/auth';
// import { guestGuard } from './guard/guest';
// import { CreateListing } from './create-listing/create-listing'

// export const routes: Routes = [
//     {path: '', redirectTo: 'welcome', pathMatch: 'full'},
//     {path: 'welcome', component: WelcomeComponent/*, canActivate: [guestGuard]*/},
//     {path: 'role-selection', component: RoleSelectionComponent/*, canActivate: [authGuard]*/},
//     {path: 'dashboard', component: DashBoardComponent/*, canActivate: [authGuard]*/},
//     {path: 'create-listing', component: CreateListing/*, canActivate: [authGuard]*/}
// ];

 import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome';
import { Dashboard } from './dashboard/dashboard';
import { RoleSelectionComponent } from './role-selection/role-selection';
import { CreateListing } from './create-listing/create-listing';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'role-selection', component: RoleSelectionComponent },
  { path: 'dashboard', component: Dashboard },
  { path: 'create-listing', component: CreateListing }
];
