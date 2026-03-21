import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase'

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomeComponent implements OnInit {
  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() {
    const { data } = await this.supabaseService.getSession();
    const user = data.session?.user;

    if (user) {
      await this.supabaseService.saveUserToDatabase({
        id: user.id,
        email: user.email ?? '',
        name: user.user_metadata?.['full_name'] ?? '',
      })
    }
  }

  async loginWithGoogle() {
    await this.supabaseService.signInWithGoogle();
  }
}
