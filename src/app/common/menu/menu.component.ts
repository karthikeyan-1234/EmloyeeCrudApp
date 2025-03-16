import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

import { KeycloakOperationService } from '../../services/keycloak.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, 
    MatTableModule, CommonModule, MatSidenavModule, MatNavList, MatListModule,
  RouterModule,HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  userName: string | undefined;
  isSideNavOpen = true;

  constructor(private router: Router, private route: ActivatedRoute,
    private keyCloakService: KeycloakOperationService){}

  ngOnInit(): void {
    this.getUserName().then(userName => this.userName = userName); // Get the username
    console.log("The user is " + this.userName);
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  selectedMenuItem: string = ''; // Track the currently selected menu item

  selectMenuItem(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  isLoggedIn(): boolean {
    let loggedIn = false;
    this.keyCloakService.isLoggedIn().then(isLoggedIn => {
      loggedIn = isLoggedIn;
    });
    return loggedIn;
  }

  async getUserName(): Promise<string> {
    if (await this.keyCloakService.isLoggedIn()) {
      return this.keyCloakService.getUserName();
    }
    return "Guest";
  }

  async logOut(): Promise<void> {
    console.log('Logging out');
    
    if (await this.keyCloakService.isLoggedIn()) {
      console.log(this.keyCloakService.getUserName());
    }
    
    console.log("Guest");
    
    this.keyCloakService.logout();
  }
}
