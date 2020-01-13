// Core
import { Injectable } from '@angular/core';

// Model
import { Banner } from './banner';

// Service
import { ApiService } from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BannerService {

    constructor(private apiService: ApiService) { }

    getAll() {
        return this.apiService.get("/banners")
            .pipe(map(data => data));
    }

    saveBanner(data): Observable<Banner> {

        let banner = {
            id: data.id,
            title: data.title,
            description: data.description,
            image: data.image,
            button_link: data.button_link,
            button_name: data.button_name,
        }

        if (banner.id) {
            return this.apiService.put("/banner/" + banner.id, banner)
                .pipe(map(data => data));
        } else {
            return this.apiService.post("/banner", banner)
                .pipe(map(data => data));
        }

    }

    updateBanner(id, data): Observable<Banner> {

        let banner = {
            "title": data.title,
            "description": data.description,
            "button_link": data.button_link,
            "button_name": data.button_name,
            "image": data.image
        }

        return this.apiService.put("/banner/" + id, banner)
            .pipe(map(data => data))
    }

    getBannerById(id: string): Observable<Banner> {
        return this.apiService.get("/banner/" + id)
            .pipe(map(data => data));
    }

    destroyBanner(id: string): Observable<Banner> {
        return this.apiService.delete("/banner/" + id)
            .pipe(map(data => data));
    }


}
