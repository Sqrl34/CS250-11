import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SupabaseService } from '../services/supabase';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
    const supabase = inject(SupabaseService);
    const router = inject(Router);

    const { data } = await supabase.getSession();
    if (!data.session) { // if not signed in direct to welcome
      router.navigate(['/welcome']);
      return false;
    }

    const requestedPath = route.routeConfig?.path;
    const userID = data.session.user.id;
    const userRole = await supabase.getUserRole(userID);

    //pages that require a role for access
    const rolePickedRequired = ['dashboard', 'create-listing'];
    if (requestedPath && rolePickedRequired.includes(requestedPath) && !userRole) {
      router.navigate(['/role-selection']);
      return false;
    }

    if (requestedPath === 'create-listing' && userRole !== 'giver') {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
};
