import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";

@Injectable({
  providedIn: "root",
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected override readonly router: Router,protected readonly keycloak: KeycloakService) 
    {
        super(router, keycloak);
    }

  //IsAccessAllowed is invoked by AuthGuard when the canActivate method is called in the route configuration.
  //The method checks if the user is authenticated and has the required roles to access the route.
  public async isAccessAllowed(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) // Inherited from the abstract base class KeycloakAuthGuard
  {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }
    // Get the roles required from the route.
    const requiredRoles = route.data["roles"];  
    // Allow the user to proceed if no additional roles are required to access the route.
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    // Check if the user has the required roles
  const hasRequiredRoles = requiredRoles.every((role) =>
    this.roles.includes(role)
  );

  if (!hasRequiredRoles) {
    if (!hasRequiredRoles) {
      this.keycloak.logout();  // Forces logout
      return false;
    }
  }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}