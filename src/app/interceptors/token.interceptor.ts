import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
        req = req.clone({
          withCredentials: true,
        });
     
        
          return next.handle(req).pipe(
            catchError((error) =>{
              if (error instanceof HttpErrorResponse
                && error.status === 403 || error.status === 401) {
                return this.handleAuthErrors(req, next);
              
                }
                return throwError(() => error)
            })
            
          );
          }
    

    


  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
      : Observable<HttpEvent<any>> {
      if (!this.isTokenRefreshing) {
          this.isTokenRefreshing = true;
          this.refreshTokenSubject.next(null);

          return this.authService.refreshToken().pipe(
              switchMap((refreshTokenResponse: LoginResponse) => {
                  this.isTokenRefreshing = false;
                  this.refreshTokenSubject
                      .next(refreshTokenResponse.authenticationToken);
                      return next.handle(this.addToken(req,
                          refreshTokenResponse.authenticationToken));
                    })
          )
      } else {
          return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => 
                  next.handle(this.addToken(req,
                      this.authService.getJwtToken()))
              )
          );
      }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
      return req.clone({
          headers: req.headers.set('Authorization',
              'Bearer ' + jwtToken)
      });
  }

}