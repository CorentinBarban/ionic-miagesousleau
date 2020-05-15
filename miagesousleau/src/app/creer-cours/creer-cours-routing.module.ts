import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CreerCoursPage} from './creer-cours.page';

const routes: Routes = [
    {
        path: '',
        component: CreerCoursPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreerCoursPageRoutingModule {
}
