import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InfoMembrePage} from './info-membre.page';

const routes: Routes = [
    {
        path: '',
        component: InfoMembrePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InfoMembrePageRoutingModule {
}
