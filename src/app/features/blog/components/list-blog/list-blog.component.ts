import { Component } from '@angular/core';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-blog',
  imports: [],
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css',
})
export class ListBlogComponent {
  blogs$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const blogsCollection = collection(this.firestore, 'blogs');
    this.blogs$ = collectionData(blogsCollection);
  }

  ngOnInit() {
    this.blogs$.subscribe((blogs) => {
      console.log('Blogs:', blogs);
    });
  }
}
