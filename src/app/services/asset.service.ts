import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private _http: HttpClient) {}
  createAsset(data: any) {
    return this._http.post(
      environment.BASE_URL + 'asset/create-asset',
      data
    );
  }
  getAssets(filters: any) {
    return this._http.post(
      environment.BASE_URL +
        'asset?page=' +
        (filters.page - 1) +
        '&size=' +
        filters.size,
      filters
    );
  }
  updateAsset(data: any,id:string) {
    return this._http.put(
      environment.BASE_URL + 'asset/update-asset/'+id,
      data
    );
  }
  historyAsset(id:string) {
    return this._http.get(
      environment.BASE_URL + 'asset/history-asset/'+id);
  }
  deleteAsset(id:string) {
    return this._http.delete(
      environment.BASE_URL + 'asset/delete-asset/'+id
    );
  }
}
