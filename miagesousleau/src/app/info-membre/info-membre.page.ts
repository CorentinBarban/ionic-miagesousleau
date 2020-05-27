import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {LoginService} from "../services/login.service";
import {ActivatedRoute} from "@angular/router";
import {MembreService} from "../services/membre.service";
import {Cours} from "../models/cours.model";
import {Membre} from "../models/membre.model";


@Component({
    selector: 'app-info-membre',
    templateUrl: './info-membre.page.html',
    styleUrls: ['./info-membre.page.scss'],
})
export class InfoMembrePage implements OnInit {

    private membre: Membre = new Membre();


    constructor(
        private navLocation: Location,
        private loginService: LoginService,
        private activatedRoute: ActivatedRoute,
        private membreService: MembreService) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.activatedRoute.params.subscribe((res) => {
            this.getInfoMembre(res['idMembre']);
        });
    }

    getInfoMembre(idMembre) {
        let that = this;
        this.membreService.getMembre(idMembre).subscribe(membreElement => {
            that.membre = membreElement;
        }); //TODO Informations membre à stocker et afficher
    }

    /**
     * Retour arrière
     */
    goBack() {
        this.navLocation.back();
    }

    logOut() {
        this.loginService.logout();
    }

}
