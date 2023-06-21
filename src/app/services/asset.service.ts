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
      environment.BASE_URL + 'asset/create-gestionnaire',
      data
    );
  }
  getAssets(filters: any) {
    return this._http.post(
      environment.BASE_URL +
        'asset?page=' +
        filters.page +
        'size=' +
        filters.size,
      filters
    );
  }
  updateAsset(data: any) {
    return this._http.post(
      environment.BASE_URL + 'asset/create-gestionnaire',
      data
    );
  }
  deleteAsset() {}
}
