import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray, ReactiveFormsModule} from "@angular/forms";
import {Cours} from "../models/cours.model";
import {CoursService} from "../services/cours.service";
import {PiscineService} from "../services/piscine.service";
import {Piscine} from "../models/piscine.model";
import {Location} from "@angular/common";
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-creer-cours',
    templateUrl: './creer-cours.page.html',
    styleUrls: ['./creer-cours.page.scss'],
})
export class CreerCoursPage implements OnInit { //TODO Check si enseignant est apte

    private dateJour;
    validationsForm: FormGroup;
    errorMessage: string = '';
    private creneau1;
    private creneau2;
    private duree;
    private creneau;

    validation_messages = { //TODO remonter erreurs soulevées par la méthdoe creerCours de gestion cours ?
        'nom': [
            {type: 'required', message: 'Nom requis'}
        ],
        'niveauCible': [
            {type: 'required', message: 'Niveau cible requis'}
        ],
        'date': [
            {type: 'required', message: 'Date requise'}
        ],
        'creneau1': [
            {type: 'required', message: 'Horaire de début requise'}
        ],
        'creneau2': [
            {type: 'required', message: 'Horaire de fin requise'}
        ],
        'lieu': [
            {type: 'required', message: 'Lieu du cours requis'}
        ],

    };

    listePiscines: (Piscine)[] = [];

    constructor(private formBuilder: FormBuilder,
                private coursService: CoursService,
                private piscineService: PiscineService,
                private navLocation: Location,
                private loginService: LoginService
    ) {
    }

    ngOnInit() {
        this.loginService.checkCredentials();
        this.getListePiscine();
        this.dateJour = this.createDate();
        this.validationsForm = this.formBuilder.group({
            nom: new FormControl('', Validators.compose([
                Validators.required
            ])),
            niveauCible: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            date: new FormControl('', Validators.compose([
                Validators.required
            ])),
            creneau1: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            creneau2: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            duree: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            idPiscine: new FormControl('', Validators.compose([
                Validators.required,
            ])),
        });
    }

    creerCours(value) {
        let that = this;
        let cours = new Cours().deserialize(value);
        console.log(cours);
        this.coursService.creerCours(value).subscribe(
            result => {
                // Handle result
                console.log(result);
            },
            error => {

                this.errorMessage = "Impossible de creer le cours, veuillez verifier les informations";
            });

    }

    calculerDuree() {
        var date1 = new Date(this.creneau1);
        var date2 = new Date(this.creneau2);
        var diff = Math.abs(date1.getTime() - date2.getTime()) / 1000;
        var hours = Math.floor(diff / 3600) % 24;
        diff -= hours * 3600;
        this.duree = hours;
        this.creneau = date1.getHours() + "h-" + date2.getHours() + "h";
        console.log(this.creneau);
    }

    createDate() {
        var date = new Date();
        date.setDate(date.getDate() + 8);
        return date.toISOString();
    }

    getListePiscine() {
        this.piscineService.getListePiscines().subscribe(piscine => {
            let that = this;
            piscine.forEach((piscineElement) => {
                that.listePiscines.push(piscineElement);
            });
        });
    }

    goBack() {
        this.navLocation.back();
    }

    logOut() {
        this.loginService.logout();
    }
}
