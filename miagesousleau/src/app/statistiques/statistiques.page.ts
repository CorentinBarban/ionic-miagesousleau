import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {PresidentService} from "../services/president.service";

@Component({
    selector: 'app-statistiques',
    templateUrl: './statistiques.page.html',
    styleUrls: ['./statistiques.page.scss'],
})
export class StatistiquesPage implements OnInit {

    private nbMembres;
    private nbEnseignants;
    private nbCours;
    private totalCotisationP;
    private totalCotisationR;

    constructor(private loginService: LoginService,
                private presidentService: PresidentService) {
    }

    ngOnInit() {
        this.getStatistiques();
    }

    logOut() {
        this.loginService.logout();
    }

    getStatistiques() {
        let that = this;
        this.presidentService.getStatistiques().subscribe(stat => {
            that.nbMembres = stat['statistiquesMembre']['nbMembres'];
            that.nbEnseignants = stat['statistiquesMembre']['nbEnseignants'];
            that.totalCotisationP = stat['statistiquesMembre']['cotisationsPrevues'];
            that.totalCotisationR = stat['statistiquesMembre']['cotisationsReglees'];
            that.nbCours = stat['statistiquesCours']['nbCoursPositionnes'];
            let stats = stat;
            console.log(stats);

        });

    }

}
