import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PaiementService} from '../services/paiement.service';
import {Cours} from '../models/cours.model';
import {Paiement} from '../models/paiement.model';
import {Router} from "@angular/router";

@Component({
    selector: 'app-payer-cotisation',
    templateUrl: './payer-cotisation.page.html',
    styleUrls: ['./payer-cotisation.page.scss'],
})
export class PayerCotisationPage implements OnInit {

    private iban;
    private somme;
    validationsForm: FormGroup;
    private errorMessage;

    validation_messages = {
        'iban': [
            {type: 'required', message: 'IBAN requis'},

        ],
        'somme': [
            {type: 'required', message: 'Somme requise'},
            {type: 'pattern', message: 'Une somme valide doit être entrée.'}
        ],

    };

    constructor(private loginService: LoginService,
                private formBuilder: FormBuilder,
                private paiementService: PaiementService,
                private router: Router) {
    }

    ngOnInit() {
        this.validationsForm = this.formBuilder.group({
            iban: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            somme: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]+$')
            ]))
        });
    }

    soumettrePaiement(value) {
        var paiement = new Paiement().deserialize(value);
        this.paiementService.payerCotisation(paiement).subscribe(
            result => {
                presentToast("Paiement effectué");
            },
            error => {
                this.errorMessage = "Impossible de réaliser le paiement, veuillez verifier les informations " + error;
            });

        async function presentToast(message) {
            const toast = document.createElement('ion-toast');
            toast.message = message;
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();

        }
    }

    logOut() {
        this.loginService.logout();
    }

    goProfile() {
        this.router.navigate(['/info-membre/' + this.loginService.getUserID()]);
    }

}
