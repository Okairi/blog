import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css',
})
export class ListBlogComponent implements OnInit, OnDestroy {
  blogs$: Observable<any[]>;
  private subscription!: Subscription;

  constructor(private firestore: Firestore) {
    const blogsCollection = collection(this.firestore, 'blogs');
    this.blogs$ = collectionData(blogsCollection);
  }

  ngOnInit() {
    this.subscription = this.blogs$.subscribe((blogs) => {
      console.log('Blogs:', blogs);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Suscripción cerrada');
    }
  }
}
