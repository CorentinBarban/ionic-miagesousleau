import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Cours} from "../models/cours.model";
import {environment} from "../../environments/environment"
import {Observable} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';
import {Piscine} from "../models/piscine.model";

@Injectable({
    providedIn: 'root'
})
export class PiscineService {

    constructor(private http: HttpClient) {
    }

    getListePiscines(): Observable<Piscine[]> {
        return this.http.get<Piscine[]>('https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=piscines&q=')
            .pipe(map((res: any) => res.records.map((piscine: Piscine) => new Piscine().deserialize(piscine))));
    }

}
