// Core
import { Injectable } from '@angular/core';

// Model
import { Contact } from './contact';

// Service
import { ApiService } from '../../backend/shared/service/api.service';

// Dependency Injection RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private apiService: ApiService) { }

    getAll() {
        return this.apiService.get("/formcontacts")
            .pipe(map(data => data));
    }

    saveContact(data): Observable<Contact> {

        let contact = {
            id: data.id,
            name: data.name,
            category: data.category,
            product: data.product,
            price: data.price
        }

        return this.apiService.post("/formcontact", contact)
                .pipe(map(data => data));
    }

    getContactById(id: string): Observable<Contact> {
        return this.apiService.get("/formcontact/" + id)
            .pipe(map(data => data));
    }

    destroyContact(id: string): Observable<Contact> {
        return this.apiService.delete("/formcontact/" + id)
            .pipe(map(data => data));
    }

}
