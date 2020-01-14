// Core
import { Injectable } from '@angular/core';

// Model
import { Setting } from './setting';

// Service
import { ApiService } from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SettingService {

    constructor(private apiService: ApiService) { }

    saveSetting(data): Observable<Setting> {

        let setting = {
            "id":data.id,
            "website_name": data.website_name,
            "address": data.address,
            "city": data.city,
            "code": data.code === null ? 0 : data.code,
            "copyright": data.copyright,
            "email": data.email,
            "logo_fb": data.logo_fb,
            "logo_instagram": data.logo_instagram,
            "logo_twitter": data.logo_twitter,
            "no_fax": data.no_fax,
            "no_telp": data.no_telp,
    }
        console.log(setting.id)
        if (setting.id === null){
            return this.apiService.post("/websetting", setting)
                .pipe(map(data => data));
        }else{
            return this.apiService.put("/websetting/" + setting.code, setting)
                .pipe(map(data => data));
        }
    }


    getSettingByCode(code: String): Observable<Setting> {
        return this.apiService.get("/websetting/" + code)
            .pipe(map(data => data));
    }

    isEmpty(val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }
}
