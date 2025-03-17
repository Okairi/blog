import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isAuthenticated: boolean = false;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.isAuthenticated = !!user;
    });
  }

  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']); // Redirige al login si no está logueado
      return false;
    }
    return true;
  }
}
