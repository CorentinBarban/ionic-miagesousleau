import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray, ReactiveFormsModule} from "@angular/forms";
import {Cours} from "../models/cours.model";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {CoursService} from "../services/cours.service";

@Component({
    selector: 'app-creer-cours',
    templateUrl: './creer-cours.page.html',
    styleUrls: ['./creer-cours.page.scss'],
})
export class CreerCoursPage implements OnInit {

    private dateJour = new Date().toISOString();
    validationsForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private coursService: CoursService) {
    }

    ngOnInit() {
        this.validationsForm = this.formBuilder.group({
            nom: new FormControl('', Validators.compose([
                Validators.required
            ])),
            niveauCible: new FormControl('', Validators.compose([
                Validators.required
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
            lieu: new FormControl('', Validators.compose([
                Validators.required,
            ])),
        });
    }

    creerCours(value) {
        var cours = new Cours().deserialize(value);
        console.log(cours);
        this.coursService.creerCours(cours);

    }

}
