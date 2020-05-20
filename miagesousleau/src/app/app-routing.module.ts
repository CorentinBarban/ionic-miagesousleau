import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login-page',
        pathMatch: 'full'
    },
    {
        path: 'inscription-cours',
        loadChildren: () => import('./inscription-cours/inscription-cours.module').then(m => m.InscriptionCoursPageModule)
    },
    {
        path: 'info-cours/:idCours',
        loadChildren: () => import('./info-cours/info-cours.module').then(m => m.InfoCoursPageModule)
    },
    {
        path: 'creer-cours',
        loadChildren: () => import('./creer-cours/creer-cours.module').then(m => m.CreerCoursPageModule)
    },
    {
        path: 'liste-cours-enseignant',
        loadChildren: () => import('./liste-cours-enseignant/liste-cours-enseignant.module').then(m => m.ListeCoursEnseignantPageModule)
    },
    {
        path: 'liste-cours-participant',
        loadChildren: () => import('./liste-cours-participant/liste-cours-participant.module').then(m => m.ListeCoursParticipantPageModule)
    },
    {
        path: 'liste-membres',
        loadChildren: () => import('./liste-membres/liste-membres.module').then(m => m.ListeMembresPageModule)
    },
    {
        path: 'login-page',
        loadChildren: () => import('./login-page/login.module').then(m => m.LoginPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
