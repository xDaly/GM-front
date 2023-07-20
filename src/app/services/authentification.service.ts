import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private _http: HttpClient) {}
  signin(data: any) {
    return this._http.post(environment.BASE_URL + 'auth/signin', data);
  }
  getGestionnairesNames(){
    return this._http.get(environment.BASE_URL+'gestionnaire/get-gestinnaires-names')
  }
}
