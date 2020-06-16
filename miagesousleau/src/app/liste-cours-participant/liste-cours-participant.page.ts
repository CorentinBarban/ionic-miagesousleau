import {Component, OnInit} from '@angular/core';
import {Cours} from "../models/cours.model";
import {CoursService} from "../services/cours.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-liste-cours-participant',
    templateUrl: './liste-cours-participant.page.html',
    styleUrls: ['./liste-cours-participant.page.scss'],
})
export class ListeCoursParticipantPage implements OnInit {
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

    getCours(idParticipant) {
        this.listeCours = [];
        this.coursService.getListeCoursParticipant(idParticipant).subscribe(cours => {
            let that = this;
            cours.forEach((coursElement) => {
                that.listeCours.push(coursElement);
            });
        });

    }

    navigateToInfoCours(idCours) {
        this.router.navigate(['/info-cours', idCours]);
    }

    logOut() {
        this.loginService.logout();
    }

    goProfile() {
        this.router.navigate(['/info-membre/' + this.loginService.getUserID()]);
    }

}
