import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MenuController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    validationsForm: FormGroup;
    errorMessage: string = '';

    validationMessages = {
        username: [
            {type: 'required', message: 'Identifiant requis'},
            {type: 'pattern', message: 'Un identifiant valide est requis.'}
        ],
        password: [
            {type: 'required', message: 'Mot de passe requis'},
            {type: 'minlength', message: 'Le mot de passe doit faire au moins 5 caractères.'}
        ]
    };


    constructor(private menu: MenuController,
                private loginService: LoginService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.menu.enable(false);
        this.validationsForm = this.formBuilder.group({
            username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ]))
        });
    }

    tryLogin(value) {
        this.loginService.obtainAccessToken(value);
    }

    /**
     * Redirige vers la page de création de compte
     */
    goRegisterPage() {
        this.router.navigate(['/register']);
    }


}
