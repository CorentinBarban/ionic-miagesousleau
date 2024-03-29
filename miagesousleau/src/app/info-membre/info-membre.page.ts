import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {LoginService} from "../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
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
    errorMessage: string = '';
    private statutModifie = false;
    private edititionDesactivee = true;

    validation_messages = {
        'role': [
            {type: 'required', message: 'Role requis'}
        ],
        'etatPaiement': [
            {type: 'required', message: 'Etat du paiement requis'}
        ],
        'etatAptitude': [
            {type: 'required', message: 'Etat de l\'aptitude requis'}
        ],
        'dateCertificat': [
            {type: 'required', message: 'Date de certificat requise'}
        ],
        'etatInscription': [
            {type: 'required', message: 'Etat de l\inscription requis'}
        ],
        'niveauPlonge': [
            {type: 'required', message: 'Niveau de plongée requis'}
        ],

    };

    constructor(
        private navLocation: Location,
        private loginService: LoginService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private membreService: MembreService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.checkRole();
        this.activatedRoute.params.subscribe((res) => {
            this.getInfoMembre(res['idMembre']);
        });
        this.validationsForm = this.formBuilder.group({
            role: new FormControl('', Validators.compose([
                Validators.required
            ])),
            etatPaiement: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            dateCertificat: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            etatAptitude: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            etatInscription: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            niveauPlonge: new FormControl('', Validators.compose([
                Validators.required,
            ]))
        });
    }

    checkRole() {
        console.log("Test : " + this.loginService.getUserRole());
        if (this.loginService.getUserRole() === 'ROLE_SECRETAIRE') {
            this.edititionDesactivee = false;
        }
    }

    getInfoMembre(idMembre) {
        let that = this;
        this.membreService.getMembre(idMembre).subscribe(membreElement => {
            that.membre = membreElement;
            console.log(that.membre);
            if (membreElement.role === "ROLE_PRESIDENT" || membreElement.role === "ROLE_SECRETAIRE") {
                that.statutModifiable = true;
            }
        });
    }

    majProfil(value) {
        let membre = new Membre().deserialize(value);
        membre.idMembre = this.membre.idMembre;
        console.log(membre);

        if (this.statutModifie) {
            this.membreService.changerStatut(this.membre.idMembre, this.membre.role);
        }
        this.membreService.majMembre(membre).subscribe(result => {
                presentToast("Profil modifié");
                this.goBack();
            },
            error => {
                this.errorMessage = "Impossible de modifier le profil, veuillez verifier les informations ";
            });

        async function presentToast(message) {
            const toast = document.createElement('ion-toast');
            toast.message = message;
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }

    changerStatut() {
        this.statutModifie = !this.statutModifie;
    }


    majEtatInscription(event) {
        switch (event) {
            case "EN_RETARD_DE_PAIEMENT":
                this.membre.etatAptitude = "NON_APTE";
                this.membre.etatInscription = "INCOMPLET";
                break;
            case "EN_REGLE":
                if (this.membre.etatAptitude === "APTE") {
                    this.membre.etatInscription = "COMPLET";
                }
                break;
            case "NON_APTE":
                this.membre.etatInscription = "INCOMPLET";
                break;
            case "APTE":
                if (this.membre.etatPaiement === "EN_REGLE") {
                    this.membre.etatInscription = "COMPLET";
                }
                break;
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
