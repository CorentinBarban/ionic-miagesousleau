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
    private statutModifiable = false;
    private edition = false;
    private statutModifie = false;

    validation_messages = {
        'role': [
            {type: 'required', message: 'Role requis'}
        ],
        'ville': [
            {type: 'required', message: 'Ville requise'}
        ],
        'pays': [
            {type: 'required', message: 'Pays requis'}
        ],
        'etatPaiement': [
            {type: 'required', message: 'Etat du paiement requis'}
        ],
        'aptitude': [
            {type: 'required', message: 'Etat de l\'aptitude requis'}
        ],
        'niveauPlonge': [
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
            etatPaiement: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            aptitude: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            niveauPlonge: new FormControl('', Validators.compose([
                Validators.required,
            ]))
        });
    }

    getInfoMembre(idMembre) {
        let that = this;
        this.membreService.getMembre(idMembre).subscribe(membreElement => {
            that.membre = membreElement;
            if (membreElement.role === "ROLE_PRESIDENT" || membreElement.role === "ROLE_SECRETAIRE") {
                that.statutModifiable = true;
            }
        });
    }

    majProfil(value) { //TODO
        if (this.statutModifie) {
            console.log("Changement statut : " + this.membre.role);
            this.membreService.changerStatut(this.membre.idMembre, this.membre.role);
            this.goBack();
        }
        //changerStatut()
        //MAJ infos
    }

    changerStatut(statut) {
        this.statutModifie = !this.statutModifie;
        console.log(this.membre.role);
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
