import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.css',
  imports: [FormsModule, CommonModule],
})
export class CreatePageComponent {
  title: string = '';
  content: string = '';
  isLoading = false;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {}

  async createBlog() {
    this.isLoading = true;
    if (!this.title.trim() || !this.content.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de enviar.',
      });
      this.isLoading = false;
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'No autenticado',
        text: 'Debes iniciar sesión para publicar un blog.',
      });
      this.isLoading = false;

      return;
    }

    try {
      const blogsCollection = collection(this.firestore, 'blogs');
      await addDoc(blogsCollection, {
        title: this.title.trim(),
        content: this.content.trim(),
        author_id: user.uid,
        created_at: new Date(),
        valoracion: 0,
      });

      this.title = '';
      this.content = '';

      this.isLoading = false;

      Swal.fire({
        icon: 'success',
        title: 'Blog publicado',
        text: 'Tu blog se ha publicado correctamente.',
        confirmButtonColor: '#3085d6',
      });

      this.router.navigate(['/home']);
    } catch (error) {
      this.isLoading = false;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al publicar el blog. Inténtalo de nuevo.',
      });
      console.error('Error:', error);
    }
  }
}
