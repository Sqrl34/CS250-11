import { Component, signal } from '@angular/core';
import { SupabaseService } from '../services/supabase';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-selection.html',
  styleUrl: './role-selection.css',
})
export class RoleSelectionComponent {
  selectedRole = signal<'giver' | 'receiver' | null>(null);
  isLoading = signal(false);

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  selectRole(role: 'giver' | 'receiver') {
    this.selectedRole.set(role);
  }

  async confirmRole() {
    const role = this.selectedRole();
    console.log('Selected role:', role);
    if (!role) return;

    this.isLoading.set(true);
    console.log('Starting role save process...');
    try {
      const { data } = await this.supabaseService.getSession();
      const user = data.session?.user;
      console.log('User session:', user);

      if (user) {
        // Set role in localStorage so UI can continue without strict DB dependencies.
        this.supabaseService.setUserRole(role);

        try {
          // Also attempt DB save, but don't block user flow on backend issues.
          console.log('Saving role to database...');
          await this.supabaseService.saveUserProfile(user, role);
          console.log('Role saved successfully');
        } catch (dbError) {
          console.warn('Could not save role to DB, continuing with local state.', dbError);
        }
      } else {
        // If no authenticated user, still set local role for development flow.
        this.supabaseService.setUserRole(role);
      }

      // Navigate to dashboard after role selection

      console.log('Navigating to listing creation page...');
      console.log('Current role is ', this.selectedRole());
      if (this.selectedRole() === 'giver') {
        this.router.navigate(['/create-listing']);
      } else {
        this.router.navigate(['/dashboard']);
      }
      console.log('Navigation completed');
      this.isLoading.set(false);
    } catch (error) {
      console.error('Error saving role:', error);
      this.isLoading.set(false);
    }
  }
}
