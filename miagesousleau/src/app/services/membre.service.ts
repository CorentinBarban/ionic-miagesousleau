import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Cours} from "../models/cours.model";
import {environment} from "../../environments/environment"
import {Observable} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MembreService {

    constructor(private http: HttpClient) {
    }

    inscriptionCoursParticipant(idParticipant, idCours) { //TODO post sur l'URL '/{idParticipant}/inscription/{idCours}'
        const myheader = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(environment.API_URL + '/{idParticipant}/inscription/{idCours}', {headers: myheader});
    }
}
