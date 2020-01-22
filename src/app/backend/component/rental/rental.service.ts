// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Model
import { Rental } from './rental';

// Service
import { ApiService } from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RentalService {

    constructor(private apiService: ApiService,
        private _http: HttpClient) { }

    getAll() {
        return this.apiService.get("/rents")
            .pipe(map(data => data));
    }

    errorHandler(error: any) {
        return throwError(error.error);
    }


    saveRental(rent_data): Observable<Rental> {

        // let x = " ' " + JSON.stringify(rent_data.rental_ruless) + " ' "

        let data_json = {
            "id": rent_data.id,
            "name_equipment": rent_data.name_equipment,
            "harga_awal": rent_data.harga_awal,
            "harga_akhir": rent_data.harga_akhir,
            "image": rent_data.image,
            "rental_rules": JSON.stringify(rent_data.rental_ruless)
        }
        if (data_json.id) {
            return this.apiService.put("/rent/" + data_json.id, data_json)
                .pipe(map(data => data));
        } else {
            return this.apiService.post("/rent", data_json)
                .pipe(map(data => data));
        }

    }

    getRentById(id: string): Observable<Rental> {
        return this.apiService.get("/rents/" + id)
            .pipe(map(data => data));
    }

    destroyRent(id: string): Observable<Rental> {
        return this.apiService.delete("/rent/" + id)
            .pipe(map(data => data));
    }


}
