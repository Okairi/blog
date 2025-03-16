import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css',
  imports: [CommonModule],
})
export class ListBlogComponent implements OnInit, OnDestroy {
  blogs$: Observable<any[]>;
  private subscription!: Subscription;
  listBlogs: any[] = [];
  usersMap: { [key: string]: string } = {}; // Mapa para almacenar user_id => nombre

  constructor(private firestore: Firestore) {
    const blogsCollection = collection(this.firestore, 'blogs');
    this.blogs$ = collectionData(blogsCollection);
  }

  ngOnInit() {
    this.subscription = this.blogs$.subscribe(async (blogs) => {
      console.log('Blogs:', blogs);

      // Obtener nombres de autores
      for (const blog of blogs) {
        if (!this.usersMap[blog.author_id]) {
          this.usersMap[blog.author_id] = await this.getUserName(
            blog.author_id
          );
        }
      }

      // Asociar los nombres de los autores a los blogs
      this.listBlogs = blogs.map((blog) => ({
        ...blog,
        authorName: this.usersMap[blog.author_id] || 'Desconocido',
      }));
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Suscripción cerrada');
    }
  }
}
