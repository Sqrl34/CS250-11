import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('UrbanYield');

  constructor(private supabaseService: SupabaseService) {
    // Ensures there is a fresh route every time page refreshes
    this.supabaseService.resetRoleConfirmedForNextSession();
  }
}
