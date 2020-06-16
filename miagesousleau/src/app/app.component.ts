import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LoginService} from "./services/login.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public appPages;
    public role;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private loginService: LoginService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        this.createMenu(this.loginService.getUserRole()); //TODO Ne marche que si on rafraichit la page
    }

    createMenu(role) {
        switch (role) {
            case 'ROLE_ENSEIGNANT':
                console.log("Enseignant");
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
                console.log("Secretaire");
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
                console.log("Président");
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
                console.log("Membre");
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
