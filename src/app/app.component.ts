import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
