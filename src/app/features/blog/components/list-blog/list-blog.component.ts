import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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

  constructor(private firestore: Firestore) {
    const blogsCollection = collection(this.firestore, 'blogs');
    this.blogs$ = collectionData(blogsCollection);
  }

  arrTest = [
    {
      title: 'cUAKKKKKKKKKK',
      created_at: {
        seconds: 1741724995,
        nanoseconds: 648000000,
      },
      author_id: '1231231231231212',
      valoracion: 4,
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.,',
    },
    {
      title: 'cUAKKKKKKKKKK',
      created_at: {
        seconds: 1741724995,
        nanoseconds: 648000000,
      },
      author_id: '1231231231231212',
      valoracion: 4,
      content: 'Contenido raro',
    },
    {
      title: 'cUAKKKKKKKKKK',
      created_at: {
        seconds: 1741724995,
        nanoseconds: 648000000,
      },
      author_id: '1231231231231212',
      valoracion: 4,
      content: 'Contenido raro',
    },
  ];

  ngOnInit() {
    this.subscription = this.blogs$.subscribe((blogs) => {
      console.log('Blogs:', blogs);
      this.listBlogs = blogs;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Suscripción cerrada');
    }
  }
}
