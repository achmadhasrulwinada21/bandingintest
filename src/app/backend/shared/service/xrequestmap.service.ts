// Core
import { Injectable }               from '@angular/core';

// Model
import { Bin }                     from '../models/Bin';

// Service
import { XRequestService }               from '../../shared/service/xrequest.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class XRequestMapService {

  constructor(private xRequestService        : XRequestService) { }

  getBinData(bin_number : String): Observable<Bin>{
    return this.xRequestService.get("https://binlist.io/lookup/" + bin_number)
                  .pipe(map(data => data))
  }

}
