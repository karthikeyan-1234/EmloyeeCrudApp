import { Injectable } from '@angular/core';
import { KeycloakService, KeycloakEventType } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService {
  constructor(private readonly keycloak: KeycloakService) {}

  // Fix: Make isLoggedIn() return a Promise<boolean>
  async isLoggedIn(): Promise<boolean> {
    return await this.keycloak.isLoggedIn();
  }

  logout(): void {
    this.keycloak.logout();
  }

  login(): void {
    this.keycloak.login();
  }

  getUserProfile(): any {
    return this.keycloak.loadUserProfile();
  }

  async getUserName(): Promise<string> {
    const loggedIn = await this.isLoggedIn();
    if (loggedIn) {
      return this.keycloak.getUsername();
    }
    return 'Guest';
  }


  async waitForInitialization(): Promise<void> {
    try {
      await this.keycloak.isLoggedIn(); // Ensures Keycloak is initialized before proceeding
      await this.keycloak.loadUserProfile(); // Ensures user profile is loaded before proceeding
    } catch (error) {
      console.error("Keycloak failed to initialize:", error);
      throw error;
    }
  }
  
  
  // Add other methods as needed for token access, user info retrieval, etc.}
}