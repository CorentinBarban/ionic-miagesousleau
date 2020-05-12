import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cours} from "../models/cours.model";
import {environment} from "../../environments/environment"
import {Observable} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CoursService {

    constructor(private http: HttpClient) {
    }

    getListeCours(): Observable<Cours[]> {
        alert("Récupération des cours");
        const myheader = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get<Cours[]>(environment.API_URL + '/gestioncours/cours/').pipe(map((res: any[]) => res.map((cours: Cours) => new Cours().deserialize(cours))));
    }
}
