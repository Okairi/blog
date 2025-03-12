import { Component } from '@angular/core';
import { ListBlogComponent } from '../../blog/components/list-blog/list-blog.component';

@Component({
  imports: [ListBlogComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
