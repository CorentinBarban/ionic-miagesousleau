import {Component, OnInit} from '@angular/core';
import {Cours} from "../models/cours.model";
import {CoursService} from "../services/cours.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-liste-cours-enseignant',
    templateUrl: './liste-cours-enseignant.page.html',
    styleUrls: ['./liste-cours-enseignant.page.scss'],
})
export class ListeCoursEnseignantPage implements OnInit {

    listeCours: (Cours)[] = [];

    constructor(private coursService: CoursService,
                public router: Router,
                private activatedRoute: ActivatedRoute,
                private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.activatedRoute.params.subscribe((res) => {
            this.getCours(this.loginService.getUserID());
        });

    }

    getCours(idEnseignant) {
        this.listeCours = [];
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

    navigateToCreerCours() {
        this.router.navigate(['/creer-cours']);
    }

    logOut() {
        this.loginService.logout();
    }
}
