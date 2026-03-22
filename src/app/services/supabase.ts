import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hzxlambzoajpoccwcacm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nah4tTxAS6AlMp0jCQD4-Q_QiWo7HPx';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
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
      options: { redirectTo: 'http://localhost:4200/role-selection'}
    });
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  async saveUserToDatabase(user: {id: string; email: string; name: string}) {
    const { error } = await this.supabase
    .from('users')
    .upsert({
      uuid: user.id,
      email: user.email,
      name: user.name,
    }, { onConflict: 'uuid'});

    if (error) {console.error('Error saving user:', error)}
  }

  async saveUserRole(userId: string, role: 'giver' | 'receiver') {
    const { error } = await this.supabase
      .from('users')
      .update({ role })
      .eq('uuid', userId);

    if (error) {
      console.error('Error saving user role:', error);
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

  setUserRole(role: 'giver' | 'receiver'): void {
    localStorage.setItem('userRole', role);
  }

  clearUserRole(): void {
    localStorage.removeItem('userRole');
  }
}
