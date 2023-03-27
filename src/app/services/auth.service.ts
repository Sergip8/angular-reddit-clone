import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { SignupRequest } from '../models/signup-request';
import { JwtHelperService} from '@auth0/angular-jwt';
import { GlobalConst } from '../global-const';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type' : 'application/json',
    
    })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
    role: this.getRole(),
  }

   private loggedIn!: BehaviorSubject<boolean>
   username = new BehaviorSubject<string>("") 

  
  constructor(private http: HttpClient, private jwt: JwtHelperService) { 
    
    this.loggedIn = new BehaviorSubject(this.isLoggedIn())
  }

  signup(signupRequestPayload: SignupRequest): Observable<any> {
    return this.http.post(GlobalConst.baseUrl + '/userAuth/register', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequest): Observable<boolean> {

    localStorage.clear()
    return this.http.post<LoginResponse>( GlobalConst.baseUrl + '/userAuth/login',
      loginRequestPayload).pipe(map(data => {
        console.log(data)
        localStorage.setItem("authenticationToken", data.authenticationToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('expiresAt', ""+data.expiresAt);

        
        this.loggedIn.next(true);
        this.username.next(data.username);
        console.log(this.tokenPayload())
        console.log(this.loggedIn.value)
        console.log(this.getRole())
        return true
      }));
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  refreshToken() {
    console.log(this.refreshTokenPayload)
    return this.http.post<LoginResponse>(GlobalConst.baseUrl + '/userAuth/refresh/token',
      this.refreshTokenPayload, httpOptions)
      .pipe(tap(response => {
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('expiresAt');
        localStorage.setItem('authenticationToken',
          response.authenticationToken);
        localStorage.setItem('expiresAt', ""+response.expiresAt);
      }));
  }

  logout() {
    
    
    this.http.post(GlobalConst.baseUrl + '/userAuth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe({
      next: (d) =>  {localStorage.clear()
                      console.log(d)},
      error: e => console.log(e.message)
      })
   
    
    this.loggedIn.next(false);
  }

  getUserName() {
    return localStorage.getItem('username');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    
    console.log(this.getUserName())
    return !!this.getJwtToken() && this.getUserName() == this.tokenPayload().sub ;
  }
  tokenPayload(){
    return this.jwt.decodeToken()
  }
  getRole(): String | null{
    const role = this.jwt.decodeToken()
    return role?.role
  }
  logIn(){
    return this.loggedIn.value
  }


}