import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { createClient, SupabaseClient, type User } from '@supabase/supabase-js';
import { isPlatformBrowser } from '@angular/common';
import { timeout } from 'rxjs';

const SUPABASE_URL = 'https://hzxlambzoajpoccwcacm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nah4tTxAS6AlMp0jCQD4-Q_QiWo7HPx';

/** Sets when the user confirms a role this tab session */
const SESSION_ROLE_CONFIRMED_KEY = 'urbanYield_roleConfirmed';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly platformId = inject(PLATFORM_ID)
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  getSupabase() {
    return this.supabase;
  }

  signInWithGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:4200/role-selection' }
    });
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  async waitForAuthUser(timeoutMs = 15000): Promise<User | null> {
    if (!isPlatformBrowser(this.platformId)) {
      const {
        data: { session },
      } = await this.supabase.auth.getSession();
      return session?.user ?? null;
    }

    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const {
        data: { session },
      } = await this.supabase.auth.getSession();
      if (session?.user) {
        return session.user;
      }
      await new Promise((r) => setTimeout(r, 50));
    }
    return null;
  }

  private displayName(user: User): string {
    const meta = user.user_metadata;
    const full = meta?.['full_name'];
    const name = meta?.['name'];
    if (typeof full === 'string' && full) return full;
    if (typeof name === 'string' && name) return name;
    return '';
  }

  async saveUserProfile(user: User, role?: 'giver' | 'receiver'): Promise<void> {
    const row: Record<string, string> = {
      uuid: user.id,
      email: user.email ?? '',
      name: this.displayName(user),
    };
    if (role) {
      row['role'] = role;
    }

    const { error } = await this.supabase.from('users').upsert(row, { onConflict: 'uuid' });

    if (error) {
      console.error('Error saving user profile:', error)
      throw error;
    }
  }

  async getUserRole(userId: string): Promise<'giver' | 'receiver' | null> {
    // Frontend-first behavior: read role from localStorage first.
    const cached = localStorage.getItem('userRole');
    if (cached === 'giver' || cached === 'receiver') {
      return cached;
    }

    const { data, error } = await this.supabase
      .from('users')
      .select('role')
      .eq('uuid', userId)
      .maybeSingle();

    if (error) {
      console.error('Error getting user role:', error);
      return null;
    }

    const role = data?.role;
    if (role === 'giver' || role === 'receiver') {
      localStorage.setItem('userRole', role);
      return role;
    }

    return null;
  }

  async saveProduceListing(listing: {
    user_id: string;
    title: string;
    quantity: string;
    Description: string;
    location: string;
    available_until: string | null;
  }) {
    const { data, error } = await this.supabase
      .from('listings')
      .insert({user_id: listing.user_id, title: listing.title, quantity: listing.quantity, description: listing.Description, location: listing.location, available_until: listing.available_until});

    if (error) {
      console.error('Error saving produce listing:', error);
      throw error;
    }
    return {data, error};
  }

  setUserRole(role: 'giver' | 'receiver'): void {
    localStorage.setItem('userRole', role);
  }

  clearUserRole(): void {
    localStorage.removeItem('userRole');
  }

  markRoleConfirmedThisSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(SESSION_ROLE_CONFIRMED_KEY, '1');
    }
  }

  hasRoleConfirmedThisSession(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return sessionStorage.getItem(SESSION_ROLE_CONFIRMED_KEY) === '1';
  }
}