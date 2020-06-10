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
export class CreerCoursPage implements OnInit {

    private dateJour;
    validationsForm: FormGroup;
    errorMessage: string = '';
    private creneau1;
    private creneau2;
    private duree;
    private creneau;

    validation_messages = {
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
        'idPiscine': [
            {type: 'required', message: 'Une piscine doit être sélectionnée'}
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
            duree: new FormControl('', Validators.compose([ //TODO durée doit être au moins d'une h
                Validators.required,
            ])),
            idPiscine: new FormControl('', Validators.compose([
                Validators.required,
            ])),
        });
    }

    creerCours(value) {
        let cours = new Cours().deserialize(value);
        cours.listeParticipants = [];
        cours.duree = this.calculerDuree(this.creneau1, this.creneau2);
        cours.creneau = this.calculerCreneau(this.creneau1, this.creneau2);
        this.coursService.creerCours(cours).subscribe(
            result => {
                presentToast("Cours créé");
                this.goBack();
            },
            error => {
                this.errorMessage = "Impossible de creer le cours, veuillez verifier les informations " + error;
            });

        async function presentToast(message) {
            const toast = document.createElement('ion-toast');
            toast.message = message;
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }

    calculerDuree(creneau1, creneau2) { //TODO Durée peut être inférieure à une heure ? Et peut elle être pleine ?
        var date1 = new Date(creneau1);
        var date2 = new Date(creneau2);
        var diff = Math.abs(date1.getTime() - date2.getTime()) / 1000;
        var hours = Math.floor(diff / 3600) % 24;
        diff -= hours * 3600;
        return hours;
    }

    calculerCreneau(creneau1, creneau2) {
        var date1 = new Date(creneau1);
        var date2 = new Date(creneau2);
        return date1.getHours() + "h-" + date2.getHours() + "h";
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
