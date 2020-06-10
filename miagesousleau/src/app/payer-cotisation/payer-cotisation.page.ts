import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-payer-cotisation',
    templateUrl: './payer-cotisation.page.html',
    styleUrls: ['./payer-cotisation.page.scss'],
})
export class PayerCotisationPage implements OnInit {

    private IBAN;
    private somme;
    validationsForm: FormGroup;

    validation_messages = {
        'IBAN': [
            {type: 'required', message: 'IBAN requis'}
        ],
        'Somme': [
            {type: 'required', message: 'Somme requise'}
        ],

    };

    constructor(private loginService: LoginService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.validationsForm = this.formBuilder.group({
            IBAN: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            Somme: new FormControl('', Validators.compose([
                Validators.required,
            ]))
        });
    }

    soumettrePaiement(value) {

    }

    logOut() {
        this.loginService.logout();
    }

}
