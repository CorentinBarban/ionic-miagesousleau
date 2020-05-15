import {Component, OnInit} from '@angular/core';
import {Cours} from "../models/cours.model";
import {CoursService} from "../services/cours.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-liste-cours-enseignant',
    templateUrl: './liste-cours-enseignant.page.html',
    styleUrls: ['./liste-cours-enseignant.page.scss'],
})
export class ListeCoursEnseignantPage implements OnInit {

    listeCours: (Cours)[] = [];

    constructor(private coursService: CoursService,
                public router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((res) => {
            this.getCours(res['idEnseignant']);
        });

    }

    getCours(idEnseignant) {
        this.coursService.getListeCoursEnseignant(idEnseignant).subscribe(cours => {
            let that = this;
            cours.forEach((coursElement) => {
                that.listeCours.push(coursElement);
            });
        });

    }

    navigateToInfoCours(idCours) {
        this.router.navigate(['/info-cours', idCours]);
    }

}