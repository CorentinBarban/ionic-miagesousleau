import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Cours} from "../models/cours.model";
import {environment} from "../../environments/environment"
import {Observable} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';
import {Cookie} from "ng2-cookies";


@Injectable({
    providedIn: 'root'
})
export class CoursService {

    constructor(private http: HttpClient) {
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

    creerCours(cours) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        let body = new HttpParams();
        //body = body.set('idCours', cours.idCours); //TODO auto-incrémenter l'id
        body = body.set('nom', cours.nom);
        body = body.set('niveauCible', cours.niveauCible);
        body = body.set('creneau', cours.creneau);
        body = body.set('duree', cours.duree);
        body = body.set('idPiscine', cours.lieu);
        body = body.set('date', cours.date);
        body = body.set('idEnseingant', '1'); //todo idEnseignant en dur
        console.log(body);
        return this.http.post<any>(environment.API_URL + '/miagesousleau/enseignants/cours', body, {headers: myheader});
    }
}
