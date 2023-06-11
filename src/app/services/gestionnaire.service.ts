import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GestionnaireService {
  constructor(private _http: HttpClient) {}

  createGestionnaire(data: any) {
    return this._http.post(
      environment.BASE_URL + 'gestionnaire/create-gestionnaire',
      data
    );
  }
  getGestionnaires() {
    return this._http.get(
      environment.BASE_URL + 'gestionnaire/get-gestionnaires');
  }
  deleteGestionnaire(id:string){
    return this._http.delete(
      environment.BASE_URL + 'gestionnaire/'+id);
  }
}
