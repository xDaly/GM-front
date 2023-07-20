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

  getArchivedGestionnaires() {
    return this._http.get(
      environment.BASE_URL + 'gestionnaire/get-archived-gestionnaires');
  }
  deleteGestionnaire(id:string){
    return this._http.put(environment.BASE_URL + 'gestionnaire/'+id,{archived:true})

  }

  updateGestionnaire(id:string,newData:any){
    return this._http.put(environment.BASE_URL + 'gestionnaire/'+id,newData)
  }
}
