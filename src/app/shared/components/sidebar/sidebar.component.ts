import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  public sidebarList: any[] = [
    {
      id: '1',
      title: 'Blog 1123123123213213 titulo titulo  ',
      author: 'Rias 1',
    },
    {
      id: '2',
      title: 'Blog 1123123123213213 titulo titulo  ',
      author: 'Rias 2',
    },
    {
      id: '3',
      title: 'Blog 1123123123213213 titulo titulo  ',
      author: 'Rias 3',
    },
  ];

  constructor() {}
}
