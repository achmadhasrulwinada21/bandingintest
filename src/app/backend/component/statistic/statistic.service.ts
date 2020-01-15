// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Model
import { Statistic } from './statistic';

// Service
import { ApiService } from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {

    constructor(private apiService: ApiService,
                private _http: HttpClient) { }

    getAll() {
        return this.apiService.get("/statistics")
            .pipe(map(data => data));
    }

    errorHandler(error: any){
      return throwError(error.error);
  }


    saveStatistic(statistic_data): Observable<Statistic> {

        let data_json = {
            "title": statistic_data.title,
            "description": statistic_data.description,
            "statistic": JSON.stringify(statistic_data.statistics)
        }
    
        return this.apiService.post("/statistic", data_json)
                .pipe(map(data => data));
      
    }

    getStatisticById(id: string): Observable<Statistic> {
        return this.apiService.get("/statistics/" + id)
            .pipe(map(data => data));
    }

    destroyStatistic(id: string): Observable<Statistic> {
        return this.apiService.delete("/statistic/" + id)
            .pipe(map(data => data));
    }


}
