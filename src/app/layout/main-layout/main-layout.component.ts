import { Component } from '@angular/core';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { AppFooterComponent } from '../../shared/components/app-footer/app-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [AppHeaderComponent, AppFooterComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
