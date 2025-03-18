import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoadingBlackComponent } from '../../../../shared/components/loading-black/loading-black.component';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css',
  imports: [CommonModule, LoadingBlackComponent],
})
export class ListBlogComponent implements OnInit, OnDestroy {
  blogs$: Observable<any[]>;
  private subscription!: Subscription;
  listBlogs: any[] = [];
  usersMap: { [key: string]: string } = {}; // Mapa para almacenar user_id => nombre

  isLoading = true;

  constructor(private firestore: Firestore, private router: Router) {
    const blogsCollection = collection(this.firestore, 'blogs');
    this.blogs$ = collectionData(blogsCollection, { idField: 'id' }); // 👈 Se agrega el ID
  }

  ngOnInit() {
    this.subscription = this.blogs$.subscribe(async (blogs) => {
      console.log('Blogs:', blogs);

      // Obtener nombres de autores solo si no están en el mapa
      const uniqueAuthors = [...new Set(blogs.map((b) => b.author_id))];

      for (const userId of uniqueAuthors) {
        if (!this.usersMap[userId]) {
          this.usersMap[userId] = await this.getUserName(userId);
        }
      }

      // Asociar los nombres de los autores a los blogs
      this.listBlogs = blogs.map((blog) => ({
        ...blog,
        authorName: this.usersMap[blog.author_id] || 'Desconocido',
      }));
      this.isLoading = false;
    });
  }

  async getUserName(userId: string): Promise<string> {
    try {
      const userDocRef = doc(this.firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      return userDoc.exists()
        ? userDoc.data()['name'] || 'Sin nombre'
        : 'Desconocido';
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return 'Error';
    }
  }

  verBlog(blogId: string) {
    this.router.navigate(['/blog', blogId]); // Redirige a la página de detalle con el ID
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Suscripción cerrada');
    }
  }
}
