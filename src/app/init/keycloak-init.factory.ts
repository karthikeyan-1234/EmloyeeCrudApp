import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'master',
        clientId: 'angular-app',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        onLoad: "login-required", // Ensure this matches your login strategy
        checkLoginIframe: false, // Optional: Reduce iframe checks
        redirectUri: "http://localhost:4200", // Optional: Specify your redirect URI
      },
    });
}