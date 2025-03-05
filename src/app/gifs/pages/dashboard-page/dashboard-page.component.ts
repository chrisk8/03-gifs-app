import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenuComponent } from '../../components/gifs-side-menu/gifs-side-menu.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    GifsSideMenuComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent { }
