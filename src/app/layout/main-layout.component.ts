import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <app-header></app-header>
    <div class="main-container" [class.collapsed]="collapsed">
      <app-sidebar (toggleCollapse)="collapsed = !collapsed"></app-sidebar>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './main-layout.component.scss',
  styles: [
    `
      .main-container {
        display: flex;
        transition: all 0.3s ease;
      }

      .content {
        margin-left: 230px;
        padding: 6rem;
        background: #f4f4f4;
        min-height: calc(100vh - 64px);
        width: calc(100% - 230px);
        transition: margin-left 0.3s ease, width 0.3s ease;
      }

      .main-container.collapsed .content {
        margin-left: 70px;
        width: calc(100% - 70px);
      }
    `,
  ],
})
export class MainLayoutComponent {
  collapsed = false;
}
