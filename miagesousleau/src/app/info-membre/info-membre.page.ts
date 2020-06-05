import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {LoginService} from "../services/login.service";
import {ActivatedRoute} from "@angular/router";
import {MembreService} from "../services/membre.service";
import {Cours} from "../models/cours.model";
import {Membre} from "../models/membre.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'app-info-membre',
    templateUrl: './info-membre.page.html',
    styleUrls: ['./info-membre.page.scss'],
})
export class InfoMembrePage implements OnInit {

    private membre: Membre = new Membre();
    validationsForm: FormGroup;
    private statusModifiable = false;
    private edition = false;
    private btnMsg = "Editer";

    validation_messages = { //TODO remonter erreurs soulevées par la méthdoe creerCours de gestion cours ?
        'role': [
            {type: 'required', message: 'Role requis'}
        ],
        'ville': [
            {type: 'required', message: 'Ville requise'}
        ],
        'pays': [
            {type: 'required', message: 'Pays requis'}
        ],
        'paiement': [
            {type: 'required', message: 'Etat du paiement requis'}
        ],
        'aptitude': [
            {type: 'required', message: 'Etat de l\'aptitude requis'}
        ],
        'niveauPlongee': [
            {type: 'required', message: 'Niveau de plongée requis'}
        ],

    };

    constructor(
        private navLocation: Location,
        private loginService: LoginService,
        private activatedRoute: ActivatedRoute,
        private membreService: MembreService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.activatedRoute.params.subscribe((res) => {
            this.getInfoMembre(res['idMembre']);
        });
        this.validationsForm = this.formBuilder.group({
            role: new FormControl('', Validators.compose([
                Validators.required
            ])),
            ville: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            pays: new FormControl('', Validators.compose([
                Validators.required
            ])),
            paiement: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            aptitude: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            niveauPlongee: new FormControl('', Validators.compose([
                Validators.required,
            ]))
        });
    }

    getInfoMembre(idMembre) {
        let that = this;
        this.membreService.getMembre(idMembre).subscribe(membreElement => {
            that.membre = membreElement;
            if (membreElement.role === "ROLE_PRESIDENT" || membreElement.role === "ROLE_SECRETAIRE") {
                that.statusModifiable = true;
            }
        });
    }

    majProfil(value) {
        //MEttre à jour role
        //MAJ infos

    }

    editer() {
        if (this.edition) {
            this.edition = false;
            this.btnMsg = "Editer";
        } else {
            this.edition = true;
            this.btnMsg = "Sauvegarder";
        }

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
