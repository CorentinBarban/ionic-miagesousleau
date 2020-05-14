import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InfoCoursPage} from './info-cours.page';

const routes: Routes = [
    {
        path: '',
        component: InfoCoursPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InfoCoursPageRoutingModule {
}
