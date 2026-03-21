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
      options: { redirectTo: 'http://localhost:4200/dashboard'}
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
}
