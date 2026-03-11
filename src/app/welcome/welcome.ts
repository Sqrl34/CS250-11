import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomeComponent {
  loginWithGoogle() {
    console.log("Google login clicked");
  }
}
