// Core
import { Injectable } from '@angular/core';

// Model
import { Menu } from './menu';

// Service
import { ApiService } from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(private apiService: ApiService) { }

    getAll() {
        return this.apiService.get("/menus")
            .pipe(map(data => data));
    }

    saveMenu(data): Observable<Menu> {

        let menu = {
            id: data.id,
            menu_link: data.menu_link,
            menu_name: data.menu_name,
         }

        if (menu.id) {
            return this.apiService.put("/menu/" + menu.id, menu)
                .pipe(map(data => data));
        } else {
            return this.apiService.post("/menu", menu)
                .pipe(map(data => data));
        }

    }

    getMenuById(id: string): Observable<Menu> {
        return this.apiService.get("/menu/" + id)
            .pipe(map(data => data));
    }

    destroyMenu(id: string): Observable<Menu> {
        return this.apiService.delete("/menu/" + id)
            .pipe(map(data => data));
    }


}
