import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase'
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomeComponent implements OnInit {
  constructor(private supabaseService: SupabaseService, private router: Router) { }

  async ngOnInit() {
    const user = await this.supabaseService.waitForAuthUser(3000);

    if (user) {
      try {
        await this.supabaseService.saveUserProfile(user);
      } catch {

      }

      // If role already exists in localStorage or DB, go to dashboard.
      const role = await this.supabaseService.getUserRole(user.id);
      if (role === 'giver' || role === 'receiver') {
        this.router.navigate([this.supabaseService.hasRoleConfirmedThisSession() ? '/dashboard' : '/role-selection']);
      }
    }
  }

  async loginWithGoogle() {
    await this.supabaseService.signInWithGoogle();
    // Redirect to role selection after login
    this.router.navigate(['/role-selection']);
  }
}
