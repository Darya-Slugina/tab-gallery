import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class ApiService {
    public url = `https://api.unsplash.com/search/photos?client_id=${environment.clientId}&page=1&per_page=30&query=`

    constructor(
        private httpClient: HttpClient
    ) { }

    public getImages(target: string): Observable<any> {
        return this.httpClient.get(this.url + target)
            .pipe(
                catchError(v => of(v['url']))
            );
    }

}