import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PayerCotisationPage} from './payer-cotisation.page';

const routes: Routes = [
    {
        path: '',
        component: PayerCotisationPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PayerCotisationPageRoutingModule {
}
