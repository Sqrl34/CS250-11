import { CanActivateFn, Router } from "@angular/router";
import { SupabaseService } from "../services/supabase";
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = async () => {
    const supabase = inject(SupabaseService);
    const router = inject(Router);

    const { data } = await supabase.getSession();

    if (data.session) {
        if (supabase.hasRoleConfirmedThisSession()) {
            router.navigate(['/dashboard']);
        } else {
            router.navigate(['/role-selection']);
        }
        return false; // Does not allow the welcome page to load
    }

    return true;
}
