import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  constructor(private http: HttpClient) {}
  createEmploye(data: any) {
    return this.http.post(
      environment.BASE_URL + 'employe/create-employe',
      data
    );
  }
  getEmployes(filters: any) {
    return this.http.post(
      environment.BASE_URL +
        'employe?page=' +
        (filters.page - 1) +
        '&size=' +
        filters.size,
      filters
    );
  }
  getEmployesForAffectation() {
    return this.http.get(environment.BASE_URL + 'employe/get-employes');
  }
  updateEmploye(data: any, id: string) {
    return this.http.post(
      environment.BASE_URL + 'employe/update-employe/' + id,
      data
    );
  }
  getEmployeAssets(id:string){
    return this.http.get(
      environment.BASE_URL + 'employe/employe-assets/' + id
    );
  }

}
