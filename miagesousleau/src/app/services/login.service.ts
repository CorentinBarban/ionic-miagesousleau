import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {Observable} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';
import {MenuController} from "@ionic/angular";


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public appPages = [];

    constructor(
        private router: Router,
        private http: HttpClient,
        private menu: MenuController) {
    }

    obtainAccessToken(loginData) {
        // tslint:disable-next-line:max-line-length
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8').set('Authorization', 'Basic ' + btoa('mslPassword:secret')),
            // tslint:disable-next-line:max-line-length
            dataParams = 'client_id=mslPassword&client_secret=secret&password=' + loginData.password + '&username=' + loginData.username + '&grant_type=password' + '&scope=read%20write';
        this.http.post('http://localhost:9001/oauth/token', dataParams, {headers: myheader})
            .pipe(map((res: any) => {
                    this.saveToken(res);
                },
                err => alert('Invalid Credentials')
            )).subscribe(result => {
            },
            error => {
                presentToast("Erreur de connexion");
            });

        async function presentToast(message) {
            const toast = document.createElement('ion-toast');
            toast.message = message;
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }

    saveToken(token) {
        const expireDate = new Date().getTime() + (1000 * token.expires_in);
        Cookie.set('access_token', token.access_token, expireDate);
        Cookie.set('userID', token.identifiant, expireDate);
        Cookie.set('role', token.role[0].authority, expireDate);
        this.createMenu(token.role[0].authority);
        this.menu.enable(true);
        this.router.navigate(['/inscription-cours']);
    }

    checkCredentials() {
        if (!Cookie.check('access_token')) {
            this.router.navigate(['/login-page']);
            this.menu.enable(false);

        }
    }

    logout() {
        Cookie.delete('access_token');
        Cookie.delete('userID');
        Cookie.delete('role');
        this.router.navigate(['/login-page']);
    }

    getUserID() {
        return Cookie.get('userID');
    }

    getUserRole() {
        return Cookie.get('role');
    }

    createMenu(role) {
        switch (role) {
            case 'ROLE_ENSEIGNANT':
                this.appPages = [
                    {
                        title: "S'inscrire à un cours",
                        url: '/inscription-cours',
                        icon: 'book'
                    },
                    {
                        title: "Ma liste d'inscriptions",
                        url: 'liste-cours-participant',
                        icon: 'grid'
                    },
                    {
                        title: 'Liste des cours enseignés',
                        url: '/liste-cours-enseignant',
                        icon: 'warning'
                    },
                    {
                        title: 'Payer la cotisation',
                        url: '/payer-cotisation',
                        icon: 'cash'
                    }

                ];
                break;
            case 'ROLE_SECRETAIRE':
                this.appPages = [
                    {
                        title: "S'inscrire à un cours",
                        url: '/inscription-cours',
                        icon: 'book'
                    },
                    {
                        title: "Ma liste d'inscriptions",
                        url: 'liste-cours-participant',
                        icon: 'grid'
                    },
                    {
                        title: 'Liste des membres',
                        url: '/liste-membres',
                        icon: 'warning'
                    },
                    {
                        title: 'Payer la cotisation',
                        url: '/payer-cotisation',
                        icon: 'cash'
                    }
                ];
                break;
            case 'ROLE_PRESIDENT':
                this.appPages = [
                    {
                        title: "S'inscrire à un cours",
                        url: '/inscription-cours',
                        icon: 'book'
                    },
                    {
                        title: "Ma liste d'inscriptions",
                        url: 'liste-cours-participant',
                        icon: 'grid'
                    },
                    {
                        title: 'Liste des cours enseignés',
                        url: '/liste-cours-enseignant',
                        icon: 'warning'
                    },
                    {
                        title: 'Liste des membres',
                        url: '/liste-membres',
                        icon: 'warning'
                    },
                    {
                        title: 'Statistiques',
                        url: '/statistiques',
                        icon: 'warning'
                    },
                    {
                        title: 'Payer la cotisation',
                        url: '/payer-cotisation',
                        icon: 'cash'
                    }
                ];
                break;
            default:
                this.appPages = [
                    {
                        title: "S'inscrire à un cours",
                        url: '/inscription-cours',
                        icon: 'book'
                    },
                    {
                        title: "Ma liste d'inscriptions",
                        url: 'liste-cours-participant',
                        icon: 'grid'
                    },
                    {
                        title: 'Payer la cotisation',
                        url: '/payer-cotisation',
                        icon: 'cash'
                    }
                ];
        }
    }
}
