import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cookie} from "ng2-cookies";
import {environment} from "../../environments/environment";
import {Adherent} from "../models/adherent.model";

@Injectable({
    providedIn: 'root'
})
export class AdherentService {

    constructor(private http: HttpClient) {
    }

    creerAdherent(adherent: Adherent) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json');
        adherent.etatPaiement = "EN_RETARD_DE_PAIEMENT";
        adherent.etatAptitude = "NON_APTE";
        adherent.etatInscription = "INCOMPLET";
        return this.http.post<any>(environment.API_URL + '/gestionmembre/membres/adherents', JSON.stringify(adherent), {headers: myheader});
    }
}
