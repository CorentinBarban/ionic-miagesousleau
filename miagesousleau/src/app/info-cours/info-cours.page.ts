import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {CoursService} from "../services/cours.service";
import {Cours} from '../models/cours.model';

@Component({
    selector: 'app-info-cours',
    templateUrl: './info-cours.page.html',
    styleUrls: ['./info-cours.page.scss'],
})
export class InfoCoursPage implements OnInit {

    private cours: Cours = new Cours();

    constructor(
        private coursService: CoursService,
        private navLocation: Location,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((res) => {
            this.getInfoCours(res['idCours']);
        });

    }

    getInfoCours(idCours) {
        let that = this;
        this.coursService.getInfoCours(idCours).subscribe(coursElement => {
            that.cours = coursElement;
        });

    }

    goBack() {
        this.navLocation.back();
    }

}
