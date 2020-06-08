import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Cours} from "../models/cours.model";
import {environment} from "../../environments/environment"
import {Observable} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';
import {Cookie} from "ng2-cookies";
import {LoginService} from "./login.service";


@Injectable({
    providedIn: 'root'
})
export class CoursService {

    constructor(private http: HttpClient,
                private loginService: LoginService) {
    }

    /**
     * Méthode retournant la liste de tous les cours disponibles
     */
    getListeCours(): Observable<Cours[]> {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<Cours[]>(environment.API_URL + '/gestioncours/cours/', {headers: myheader})
            .pipe(map((res: any) => res.map((cours: Cours) => new Cours().deserialize(cours))));
    }

    /**
     * Méthode retournant la liste de tous les cours liés à un enseignant
     * @param idEnseignant
     */

    getListeCoursEnseignant(idEnseignant): Observable<Cours[]> {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<Cours[]>(environment.API_URL + '/gestioncours/cours/enseignant?enseignant=' + idEnseignant, {headers: myheader})
            .pipe(map((res: any) => res.map((cours: Cours) => new Cours().deserialize(cours))));
    }

    /**
     * Méthode retournant la liste de tous les cours liés à un participant
     * @param idParticipant
     */
    getListeCoursParticipant(idParticipant): Observable<Cours[]> {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<Cours[]>(environment.API_URL + '/gestioncours/cours/participant?participant=' + idParticipant, {headers: myheader})
            .pipe(map((res: any) => res.map((cours: Cours) => new Cours().deserialize(cours))));
    }

    /**
     * Méthode retournant toutes les information d'un cours
     * @param idCours
     */

    getInfoCours(idCours): Observable<Cours> {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<Cours>(environment.API_URL + '/gestioncours/cours/' + idCours, {headers: myheader})
            .pipe(map(res => new Cours().deserialize(res)));

    }

    /**
     * Méthode permettant de créer un cours
     * @param cours
     */

    creerCours(cours: Cours) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        cours.idEnseignant = Number(this.loginService.getUserID());
        return this.http.post<any>(environment.API_URL + '/miagesousleau/enseignants/cours', JSON.stringify(cours), {headers: myheader});
    }
}
