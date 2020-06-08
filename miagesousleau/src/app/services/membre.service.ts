import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Cours} from "../models/cours.model";
import {environment} from "../../environments/environment"
import {Observable} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';
import {Membre} from "../models/membre.model";
import {Cookie} from "ng2-cookies";

@Injectable({
    providedIn: 'root'
})
export class MembreService {

    constructor(private http: HttpClient) {
    }

    inscriptionCoursParticipant(idParticipant, idCours) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.post<any>(environment.API_URL + '/miagesousleau/participants/' + idParticipant + '/inscription/' + idCours, null, {headers: myheader}).subscribe(); //TODO faire le subscribe au lancement du front
    }

    isInscriptionPossible(idCours) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<any>(environment.API_URL + '/gestioncours/cours/' + idCours + '/inscriptions', {headers: myheader});
    }

    getParticipantWithCours(idParticipant) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<any>(environment.API_URL + '/gestioncours/cours/participant?participant=' + idParticipant, {headers: myheader});
    }

    getMembre(idMembre) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<any>(environment.API_URL + '/gestionmembre/membres/' + idMembre, {headers: myheader});
    }

    getListMembres(): Observable<Membre[]> {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        return this.http.get<Membre[]>(environment.API_URL + '/gestionmembre/membres', {headers: myheader})
            .pipe(map((res: any) => res.map((membre: Membre) => new Membre().deserialize(membre))));
    }

    majMembre(membre: Membre) {
        //TODO Mise à jour membre
        //Changer le statut
        //
    }

    changerStatut(idMembre, statut) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + Cookie.get('access_token'));
        var statut2;
        switch (statut) {
            case "ROLE_ENSEIGNANT":
                statut2 = "ENSEIGNANT";
                console.log(environment.API_URL + '/gestionmembre/membres/' + idMembre + '?statut=' + statut2);
                break;
            case "ROLE_ADHERENT":
                statut2 = "ADHERENT";
                console.log(environment.API_URL + '/gestionmembre/membres/' + idMembre + '?statut=' + statut2);
                break;
        }
        return this.http.put<any>(environment.API_URL + '/gestionmembre/membres/' + idMembre + '?statut=' + statut2, null, {headers: myheader}).subscribe();

    }


}
