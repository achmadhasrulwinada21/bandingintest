// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Model
import { DetailRent } from './detail-rent';

// Service
import { ApiService } from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DetailRentService {

    constructor(private apiService: ApiService,
        private _http: HttpClient) { }

    getAll() {
        return this.apiService.get("/rentdesciptions")
            .pipe(map(data => data));
    }

    errorHandler(error: any) {
        return throwError(error.error);
    }


    saveDetailrent(rent_data): Observable<DetailRent> {

        let data_json = {
            "id": rent_data.id,
            "title": rent_data.title,
            "description": rent_data.description,
            "image": rent_data.image,
            }
        if (data_json.id) {
            return this.apiService.put("/rentdesciption/" + data_json.id, data_json)
                .pipe(map(data => data));
        } else {
            return this.apiService.post("/rentdesciption", data_json)
                .pipe(map(data => data));
        }

    }

    getDetailRentById(id: string): Observable<DetailRent> {
        return this.apiService.get("/rentdesciptions/" + id)
            .pipe(map(data => data));
    }

    destroyDetailRent(id: string): Observable<DetailRent> {
        return this.apiService.delete("/rentdesciption/" + id)
            .pipe(map(data => data));
    }


}
