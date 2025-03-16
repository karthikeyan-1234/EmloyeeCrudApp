import { Component, VERSION } from '@angular/core';
import { MatToolbar,MatToolbarModule  } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { KeycloakAngularModule } from 'keycloak-angular';
import { MenuComponent } from './common/menu/menu.component';
import { KeycloakOperationService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,
    MatTableModule, CommonModule, MatSidenavModule, MatListModule,
    RouterModule, HttpClientModule, KeycloakAngularModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'EmloyeeCrudApp';

  userName: string | undefined;
  isSideNavOpen = true;

  constructor(private keyCloakService: KeycloakOperationService,private router: Router) {
    console.log('Angular version: ', VERSION.full);
    //Log in to keycloak
  }

  async ngOnInit() {
    await this.initializeUser();
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

  async initializeUser() {
    console.log("Initializing user...");
  
    try {
      await this.keyCloakService.waitForInitialization(); // Ensures Keycloak is fully initialized
  
      const isLoggedIn = await this.keyCloakService.isLoggedIn();
      console.log("User logged in:", isLoggedIn);
  
      if (isLoggedIn) {
        this.userName = await this.keyCloakService.getUserName();
        console.log("User initialized:", this.userName);
      } else {
        console.warn("User not logged in. Setting default.");
        this.userName = "Guest";
      }
    } catch (error) {
      console.error("Error initializing user:", error);
      this.userName = "Guest";
    }
  }
  
  
  getUserName(): string {
    return this.userName || 'Guest';
  }


  logOut(): void {
    console.log('Logging out');
    
    this.keyCloakService.logout();
  }
  
}
