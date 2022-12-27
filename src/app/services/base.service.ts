import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class BaseService {
  constructor(protected readonly _http: HttpClient) {}

  protected getOld(url: string, options?: any): any {
    if (options === null) {
      return this._http.get(url).pipe(catchError(this.handleError));
    } else {
      return this._http.get(url, options).pipe(catchError(this.handleError));
    }
  }

  protected get(url: string, options?: any): any {
    if (options === null) {
      return this._http.get(url).pipe(catchError(this.handleError));
    } else {
      return this._http
        .get(url, {
          ...this.httpOptionsForGet(options),
          ...options,
        })
        .pipe(catchError(this.handleError));
    }
  }

  protected put(url: string, body: any, options?: any) {
    return this._http
      .put(url, body, {
        ...this.httpOptionsForPost(options),
        ...options,
      })
      .pipe(catchError(this.handleError));
  }

  protected delete(url: string, options?: any) {
    return this._http
      .delete(url, {
        ...this.httpOptionsForPost(options),
        ...options,
      })
      .pipe(catchError(this.handleError));
  }

  protected patch(url: string, body: any, options?: any) {
    return this._http
      .patch(url, body, {
        ...this.httpOptionsForPost(options),
        ...options,
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Standard implementation of PUT, using the options for PUT, and error handler in a standard way.
   * TODO: NEED TO OVERRIDE THE TENANT ID HERE SOMEHOW FOR NOTES API
   */
  protected post(url: string, body: any, options?: any) {
    return this._http
      .post(url, body, {
        ...options,
        ...this.httpOptionsForPost(options),
      })
      .pipe(catchError(this.handleError));
  }

  // TODO: NEED TO OVERRIDE THE TENANT ID HERE SOMEHOW FOR NOTES API
  private httpOptionsForPost(options): any {
    return { headers: this.getCommonHeaders(options) };
  }

  private httpOptionsForGet(options): any {
    return { headers: this.getCommonHeaders(options) };
  }

  // TODO: NEED TO OVERRIDE THE TENANT ID HERE SOMEHOW FOR NOTES API
  private getCommonHeaders(options): HttpHeaders {
    let hh = new HttpHeaders();

    hh = hh.append('Cache-Control', 'no-cache, no-store');
    hh = hh.append('Expires', '0');
    hh = hh.append('Pragma', 'no-cache');
    hh = hh.append('timeout', '120000');
    hh = hh.append('requestor', 'ui');
    if (options && options.headers) {
      for (let key in options.headers) {
        hh = hh.append(key, options.headers[key]);
      }
    }

    return hh;
  }

  /**
   * Handle any errors in retrieving data from the server.
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage: any;

    try {
      if (error.status === 401) {
        errorMessage = {
          responseobject: { errors: [] },
          statuscode: 401,
          traceid: '',
        };
      } else if (error.error && error.status === 400) {
        errorMessage = error.error;
      } else if (error.error && error.error.hasOwnProperty('responseobject')) {
        errorMessage = error.error;
      } else if (
        error.error &&
        error.error.message.indexOf('FileSizeLimitExceededException') > -1
      ) {
        errorMessage = 'FileSizeLimitExceededException';
      } else {
        errorMessage = error.message ? error.message : error.toString();
      }
    } catch (e) {
      // Nothing to do if we got an error trying to format a nice error message.
      errorMessage = e.message;
    }

    // this._logger.error(`API call encountered an error: ${errorMessage}`);
    return throwError(errorMessage);
  }
}
