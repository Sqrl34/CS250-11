import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { SupabaseService } from './services/supabase';

export function resetRoleConfirmedForNextSession() {
  const supabase = inject(SupabaseService);
  return () => supabase.resetRoleConfirmedForNextSession();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {provide: APP_INITIALIZER, useFactory: resetRoleConfirmedForNextSession, multi: true},
  ]
};
