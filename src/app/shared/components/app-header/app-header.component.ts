import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
})
export class AppHeaderComponent {
  menuOpen = false;
  isAuthenticated = false; // Estado de autenticación

  constructor(private auth: Auth, private router: Router) {
    // Detectar cambios en la autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.isAuthenticated = !!user;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/auth/login']); // Redirigir al login
  }
}
