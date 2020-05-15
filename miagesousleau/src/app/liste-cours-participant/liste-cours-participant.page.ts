import {Component, OnInit} from '@angular/core';
import {Cours} from "../models/cours.model";
import {CoursService} from "../services/cours.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-liste-cours-participant',
    templateUrl: './liste-cours-participant.page.html',
    styleUrls: ['./liste-cours-participant.page.scss'],
})
export class ListeCoursParticipantPage implements OnInit {
    listeCours: (Cours)[] = [];

    constructor(private coursService: CoursService,
                public router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((res) => {
            this.getCours(res['idParticipant']);
        });

    }

    getCours(idParticipant) {
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


}
