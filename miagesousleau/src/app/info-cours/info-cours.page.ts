import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursService} from '../services/cours.service';
import {MembreService} from '../services/membre.service';
import {Cours} from '../models/cours.model';
import {LoginService} from '../services/login.service';

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
    private idParticipant;

    constructor(
        private coursService: CoursService,
        private membreService: MembreService,
        private navLocation: Location,
        private activatedRoute: ActivatedRoute,
        private loginService: LoginService,
        private router: Router) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.idParticipant = Number(this.loginService.getUserID());
        this.activatedRoute.params.subscribe((res) => {
            this.getInfoCours(res['idCours']);
        });

    }

    refreshInfos(cours) {
        if (typeof cours.listeParticipants !== 'undefined' && cours.listeParticipants != null) {
            if (cours.listeParticipants.includes(this.idParticipant)) {
                this.disabled = true;
                this.button_info = "Déja inscrit"
            }
        }
    }

    getInfoCours(idCours) {
        let that = this;
        this.coursService.getInfoCours(idCours).subscribe(coursElement => {
            that.cours = coursElement;
            this.refreshInfos(that.cours);
        });

    }

    inscriptionCours() {
        this.membreService.inscriptionCoursParticipant(this.idParticipant, this.cours.idCours).subscribe(result => {
                presentToast("Inscription confirmée");
                this.goBack();
            },
            error => {
                this.error_message = "Erreur : Impossible de s'inscrire au cours. Vérifiez le niveau de plongée requis";
            });

        async function presentToast(message) {
            const toast = document.createElement('ion-toast');
            toast.message = message;
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }

    goBack() {
        this.navLocation.back();
    }

    logOut() {
        this.loginService.logout();
    }

    goProfile() {
        this.router.navigate(['/info-membre/' + this.loginService.getUserID()]);
    }
}
