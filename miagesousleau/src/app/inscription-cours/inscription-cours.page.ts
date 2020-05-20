import {Component, OnInit} from '@angular/core';
import {CoursService} from "../services/cours.service"
import {Cours} from "../models/cours.model";
import {Router} from '@angular/router';
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-inscription-cours',
    templateUrl: './inscription-cours.page.html',
    styleUrls: ['./inscription-cours.page.scss'],
})
export class InscriptionCoursPage implements OnInit {

    listeCours: (Cours)[] = [];

    constructor(private coursService: CoursService,
                public router: Router,
                private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.getCours();
    }

    getCours() {
        this.coursService.getListeCours().subscribe(cours => {
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
}
