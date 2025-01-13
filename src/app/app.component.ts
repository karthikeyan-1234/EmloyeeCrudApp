import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { Product } from './models/product';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, 
    MatTableModule, CommonModule, MatSidenavModule, MatNavList, MatListModule,
  RouterModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'EmloyeeCrudApp';
  products:Product[] = [];
  displayedColumns: string[] = ['name', 'age']

  isSideNavOpen = true;

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  constructor(){}

}
