import {Component, OnInit} from '@angular/core';
import {CoursService} from "../services/cours.service"
import {Cours} from "../models/cours.model";
import {Router} from '@angular/router';

@Component({
    selector: 'app-inscription-cours',
    templateUrl: './inscription-cours.page.html',
    styleUrls: ['./inscription-cours.page.scss'],
})
export class InscriptionCoursPage implements OnInit {

    public listeCours = [];

    constructor(private coursService: CoursService,
                public router: Router) {
    }

    ngOnInit() {
        this.getCours();
    }

    getCours() {
        this.coursService.getListeCours().subscribe(cours => {
            var liste = cours;
            for (let i = 0; i < liste.length; i++) {
                this.listeCours.push(liste[i]);
            }
        });

    }

    getInfoCours(idCours) {
        this.router.navigate(['/info-cours', idCours]);
    }

}
