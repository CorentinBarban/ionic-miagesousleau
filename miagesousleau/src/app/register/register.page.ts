import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController, MenuController} from "@ionic/angular";
import {MembreService} from "../services/membre.service";
import {Membre} from "../models/membre.model";
import {Adherent} from "../models/adherent.model";
import {AdherentService} from "../services/adherent.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})

/**
 * Cette classe permet à un utilisateur qui n'a pas encore de compte de s'en créer un
 */

export class RegisterPage implements OnInit {
    validations_form: FormGroup;
    errorMessage: string = '';
    loading: any;

    validation_messages = {
        'adresseMail': [
            {type: 'required', message: 'Adresse email requise.'},
            {type: 'pattern', message: 'Merci d\'entrer une adresse valide.'}
        ],
        'password': [
            {type: 'required', message: 'Mot de passe requis.'},
            {type: 'minlength', message: 'Le mot de passe doit faire au moins 5 caractères.'}
        ],
        'nom': [
            {type: 'required', message: 'Nom requis.'},
        ],
        'prenom': [
            {type: 'required', message: 'Prénom requis.'},
        ],
        'villeResidence': [
            {type: 'required', message: 'Ville de résidence requise.'},
        ],
        'paysResidence': [
            {type: 'required', message: 'Pays de résidence requis.'},
        ],
        'dateCertificat': [
            {type: 'required', message: 'Date d\'établissement du certificat médical requise.'},
        ],
        'niveauPlonge': [
            {type: 'required', message: 'Niveau de plongée requis.'},
        ],
        'login': [
            {type: 'required', message: 'Login requis.'},
        ],
        'numLicence': [
            {type: 'required', message: 'Numéro de licence national requis.'},
        ]

    };

    constructor(
        public menu: MenuController,
        private formBuilder: FormBuilder,
        private router: Router,
        public loadingCtrl: LoadingController,
        public adherentService: AdherentService
    ) {
    }

    /**
     * S'assure que les informations présentes dans les champs respectent bien les patterns définis
     */
    ngOnInit() {
        this.validations_form = this.formBuilder.group({
            nom: new FormControl('', Validators.compose([
                Validators.required
            ])),
            prenom: new FormControl('', Validators.compose([
                Validators.required
            ])),
            adresseMail: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ])),
            villeResidence: new FormControl('', Validators.compose([
                Validators.required
            ])),
            paysResidence: new FormControl('', Validators.compose([
                Validators.required
            ])),
            dateCertificat: new FormControl('', Validators.compose([
                Validators.required
            ])),
            niveauPlonge: new FormControl('', Validators.compose([
                Validators.required
            ])),
            numLicence: new FormControl('', Validators.compose([
                Validators.required
            ])),
            login: new FormControl('', Validators.compose([
                Validators.required
            ]))
        });
    }

    /**
     * Création du compte.
     * @param value
     */
    tryRegister(value) {
        var adherent = new Adherent().deserialize(value);

        console.log(adherent);
        this.adherentService.creerAdherent(value).subscribe(
            result => {
                this.errorMessage = '';
                presentToast("Compte créé");
                this.goLoginPage();

                async function presentToast(message) {
                    const toast = document.createElement('ion-toast');
                    toast.message = message;
                    toast.duration = 1000;

                    document.body.appendChild(toast);
                    return toast.present();
                }
            },
            error => {
                this.errorMessage = "Impossible de creer le compte : " + error.message;
            });
    }

    /**
     * Retour sur la page de connexion
     */
    goLoginPage() {
        this.router.navigate(['/login-page']);
    }

    /**
     * Instance de menu lors de la création de la page
     */
    ionViewWillEnter() {
        this.menu.enable(false);
    }


}
