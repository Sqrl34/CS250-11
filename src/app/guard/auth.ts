import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SupabaseService } from '../services/supabase';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
    const supabase = inject(SupabaseService);
    const router = inject(Router);

    const { data } = await supabase.getSession();
    if (data.session) {
        // If accessing dashboard, check if user has selected a role (front-end first).
        if (route.routeConfig?.path === 'dashboard') {
            const userRole = await supabase.getUserRole(data.session.user.id);
            if (!userRole) {
                router.navigate(['/role-selection']);
                return false;
            }
        }
        return true;
    }

    router.navigate(['/welcome'])
    return false;
}