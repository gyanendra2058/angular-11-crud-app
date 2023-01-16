import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridData } from '../models/grid-data';
import { RequestParams } from '../types/request-params';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TemplatesGridService extends BaseService {
  constructor(protected readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getGridData(entity: 'ALERT' | 'CASES', params: RequestParams): Observable<GridData> {
    console.log(entity, params);
    return this.post('api/profiles/filterAll', params.payload, { params: params.queryParams }).pipe(
      map((data: any) => new GridData(data.content, data.totalElements))
    );
  }
}
