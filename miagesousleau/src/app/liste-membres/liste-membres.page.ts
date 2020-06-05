import {Component, OnInit} from '@angular/core';
import {Cours} from "../models/cours.model";
import {CoursService} from "../services/cours.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Membre} from "../models/membre.model";
import {MembreService} from "../services/membre.service";
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-liste-membres',
    templateUrl: './liste-membres.page.html',
    styleUrls: ['./liste-membres.page.scss'],
})
export class ListeMembresPage implements OnInit {

    listeMembres: (Membre)[] = [];

    constructor(private membreService: MembreService,
                public router: Router,
                private activatedRoute: ActivatedRoute,
                private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.getListeMembres();
    }

    getListeMembres() {
        this.membreService.getListMembres().subscribe(membre => {
            let that = this;
            membre.forEach((membreElement) => {
                that.listeMembres.push(membreElement);
            });
        });
    }

    navigateToProfile(idMembre) {
        this.router.navigate(['/info-membre', idMembre]);
    }

    logOut() {
        this.loginService.logout();
    }
}
