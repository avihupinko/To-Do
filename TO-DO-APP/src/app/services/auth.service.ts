import { EventEmitter, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  public static TOKEN_NAME = 'id_token';
  private readonly PATH = `${environment.URL_API}`;

  public loggedOut$: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: Http,
              private authHttp: AuthHttp) {
  }

  // todo: hide the password from the payload
  public login(email: string, password: string): Observable<boolean> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = {email: email, password: password};
    return this.http.post(`${this.PATH}/login`, body, {headers: headers})
      .map((response: Response) => {
        const res = response.json();
        localStorage.setItem(AuthService.TOKEN_NAME, res.token);
        return true;
      })
      .catch(error => Observable.throw(error));
  }

  public register(email: string, password: string): Observable<boolean> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = {email: email, password: password};
    return this.http.post(`${this.PATH}/register`, body, {headers: headers})
      .map((response: Response) => {
        const res = response.json();
        localStorage.setItem(AuthService.TOKEN_NAME, res.token);
        return true;
      })
      .catch(error => Observable.throw(error));
  }


  /**
   * Checks if the user is logged in
   */
  public loggedIn(): boolean {
    return tokenNotExpired(AuthService.TOKEN_NAME);
  }

  /**
   * Logs out the current user and clears the local storage
   */
  public logOut(): void {
    localStorage.clear();
    this.loggedOut$.emit();
  }


}
