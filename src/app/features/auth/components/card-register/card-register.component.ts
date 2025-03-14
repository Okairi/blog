import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-register',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
    RouterLink,
  ],
  templateUrl: './card-register.component.html',
  styleUrl: './card-register.component.css',
})
export class CardRegisterComponent {
  @Input() title: string = 'Registro';
  @Input() isRegister: boolean = true;
  @Output() formSubmit = new EventEmitter<{
    email: string;
    password: string;
  }>();
  @Input() isLoading: boolean = false;

  // Crear el formulario
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const formData = {
        email: this.registerForm.get('email')?.value ?? '',
        password: this.registerForm.get('password')?.value ?? '',
      };
      this.formSubmit.emit(formData);
      this.registerForm.reset(); // Reiniciar el formulario
    }
  }
}
