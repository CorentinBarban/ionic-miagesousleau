import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cookie} from "ng2-cookies";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PresidentService {

    constructor(private http: HttpClient) {
    }

    getStatistiques() {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<any>(environment.API_URL + '/miagesousleau/presidents/statistiques', {headers: myheader});
    }
}
