import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router'; // Import Router if you need to navigate on error

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized
        if (error.status === 401) {
            this.keycloakService.logout();
        }
        // Handle 403 Forbidden
        if (error.status === 403) {
            Swal.fire('Access Denied', 'You are not authorized to access this resource', 'error');
            this.router.navigate(['/']); // Navigate to home page on error
        }
        // Handle 404 Not Found
        if (error.status === 404) {
            Swal.fire('Resource Not Found', 'The requested resource was not found', 'error');
            this.router.navigate(['/']); // Navigate to home page on error
        }
        // Handle 500 Internal Server Error
        if (error.status === 500) {
            Swal.fire('Internal Server Error', 'An unexpected error occurred', 'error');
            this.router.navigate(['/']); // Navigate to home page on error
        }
        return throwError(error);
      })
    );
  }
}