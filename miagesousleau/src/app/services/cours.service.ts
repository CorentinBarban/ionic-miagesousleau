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

    // J'arrive à recevoir un objet "Observable" suite à cette méthode, mais je ne parviens pas à créer un Cours à partr de cet observable. Il manque simplement ceyte étape sinon ça fonctionne
    getListeCours(): Observable<Cours[]> {
        console.log("Récupération des cours");
        const myheader = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get<Cours[]>(environment.API_URL + '/gestioncours/cours/');
    }
}
