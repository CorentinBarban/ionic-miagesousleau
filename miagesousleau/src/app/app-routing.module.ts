import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'inscription-cours',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
    },
    {
        path: 'inscription-cours',
        loadChildren: () => import('./inscription-cours/inscription-cours.module').then(m => m.InscriptionCoursPageModule)
    },
    {
        path: 'info-cours/:idCours',
        loadChildren: () => import('./info-cours/info-cours.module').then(m => m.InfoCoursPageModule)
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
