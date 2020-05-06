import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InscriptionCoursPage} from './inscription-cours.page';

const routes: Routes = [
    {
        path: '',
        component: InscriptionCoursPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InscriptionCoursPageRoutingModule {
}
