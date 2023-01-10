import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DynamicCollections } from '../models/dynamic-collections';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationCollectionService extends BaseService {

  private static _dynamicCollections: DynamicCollections;

  constructor(protected readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  public getTranslationCollection(lang: string): Observable<DynamicCollections> {
    return this.get(
      `api/translations/collection?locale=${lang}&generateKeys=true`
    ).pipe(
      map((data: any) => data[`${lang}`])
    );
  }

  public static getValue(key: string): string {
    return TranslationCollectionService._dynamicCollections.getValue(key);
  }

  public static setValue(collection: Map<string, string>): void {
    TranslationCollectionService._dynamicCollections = new DynamicCollections(collection);
  }
}
