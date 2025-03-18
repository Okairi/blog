import { Component } from '@angular/core';
import { CardRegisterComponent } from '../../components/card-register/card-register.component';
import { AuthService } from '../../services/auth-service.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';

interface ObjForm {
  email: string;
  password: string;
}

@Component({
  imports: [CardRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}
  async onSubmit(obj: ObjForm) {
    this.isLoading = true;

    const { email, password } = obj;

    try {
      let registerResponse = await this.authService.register(email, password);
      this.alert('Registro exitoso!', 'Puede iniciar sesión', 'success');

      this.router.navigate(['/auth/login']);
    } catch (error) {
      this.alert(
        'Error de autenticación',
        'Revisa tus credenciales y vuelve a intentarlo',
        'error'
      );
    } finally {
      this.isLoading = false;
    }
  }

  alert(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar',
    });
  }
}
