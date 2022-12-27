import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationCollectionService extends BaseService {
  constructor(protected readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  public getTranslationCollection(): Observable<any> {
    return this.get(
      'api/translations/collection?locale=en-US&generateKeys=true'
    );
  }
}
