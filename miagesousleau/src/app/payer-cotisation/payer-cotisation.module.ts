import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PayerCotisationPageRoutingModule} from './payer-cotisation-routing.module';

import {PayerCotisationPage} from './payer-cotisation.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PayerCotisationPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [PayerCotisationPage]
})
export class PayerCotisationPageModule {
}
