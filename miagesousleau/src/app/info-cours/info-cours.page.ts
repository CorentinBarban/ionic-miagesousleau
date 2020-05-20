import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {CoursService} from "../services/cours.service";
import {MembreService} from "../services/membre.service";
import {Cours} from '../models/cours.model';
import {Membre} from "../models/membre.model";
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-info-cours',
    templateUrl: './info-cours.page.html',
    styleUrls: ['./info-cours.page.scss'],
})
export class InfoCoursPage implements OnInit {

    private cours: Cours = new Cours();
    private error_message = "";
    private button_info = "S'inscrire";
    private disabled = false;
    private participant: Membre = new Membre();

    constructor(
        private coursService: CoursService,
        private membreService: MembreService,
        private navLocation: Location,
        private activatedRoute: ActivatedRoute,
        private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.activatedRoute.params.subscribe((res) => {
            this.getInfoCours(res['idCours']);
        });

    }

    refreshInfos() {
        if (this.cours.listeParticipants.includes(this.participant.idMembre)) {
            this.disabled = true;
            this.button_info = "Déja inscrit"
        }
    }

    getInfoCours(idCours) {
        let that = this;
        this.coursService.getInfoCours(idCours).subscribe(coursElement => {
            that.cours = coursElement;
        });
        this.refreshInfos();
    }

    inscriptionCours() {
        this.membreService.inscriptionCoursParticipant(this.participant.idMembre, this.cours.idCours); //TODO idParticipant en DUR
    }

    goBack() {
        this.navLocation.back();
    }

    logOut() {
        this.loginService.logout();
    }
}
