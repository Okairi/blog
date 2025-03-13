import { Component } from '@angular/core';
import { CardRegisterComponent } from '../../components/card-register/card-register.component';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

interface ObjForm {
  email: string;
  password: string;
}

@Component({
  imports: [CardRegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean = false; // Controla el estado de carga

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(obj: ObjForm) {
    let { email, password } = obj;
    console.log(obj);
    this.isLoading = true; // Inicia el loading

    try {
      const userCredential = await this.authService.login(email, password);
      console.log('Logged in successfully:', userCredential.user);

      this.router.navigate(['/home']); // Redirige a la página de home
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
