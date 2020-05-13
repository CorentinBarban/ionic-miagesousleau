import {Component, OnInit} from '@angular/core';
import {CoursService} from "../services/cours.service"

@Component({
    selector: 'app-inscription-cours',
    templateUrl: './inscription-cours.page.html',
    styleUrls: ['./inscription-cours.page.scss'],
})
export class InscriptionCoursPage implements OnInit {

    constructor(private coursService: CoursService) {
    }

    ngOnInit() {
    }

    getCours() {
        let test = this.coursService.getListeCours().subscribe(cours => {
            console.log(cours); // Example
        });

    }

}
