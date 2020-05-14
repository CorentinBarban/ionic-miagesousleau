import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {CoursService} from "../services/cours.service";

@Component({
    selector: 'app-info-cours',
    templateUrl: './info-cours.page.html',
    styleUrls: ['./info-cours.page.scss'],
})
export class InfoCoursPage implements OnInit {

    private idCours;
    private nomCours;
    private dateCours;
    private niveauCible;
    private creneau;
    private date;
    private duree;
    private idEnseignant;
    private idPiscine;
    private listeParticipants;

    constructor(private coursService: CoursService,
                private navLocation: Location,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((res) => {
            this.idCours = res['idCours'];
            console.log('Id : ' + this.idCours);
        });
    }

    ngOnInit() {
        this.getInfoCours();
    }

    getInfoCours() {
        this.coursService.getInfoCours(this.idCours).subscribe(cours => {
            this.nomCours = cours.nom;
            this.dateCours = cours.date;
            this.niveauCible = cours.niveauCible;
            this.creneau = cours.creneau;
            this.date = cours.date;
            this.duree = cours.duree;
            this.idEnseignant = cours.idEnseignant;
            this.idPiscine = cours.idPiscine;
            this.listeParticipants = cours.listeParticipants;
        });
    }

    goBack() {
        this.navLocation.back();
    }

}
