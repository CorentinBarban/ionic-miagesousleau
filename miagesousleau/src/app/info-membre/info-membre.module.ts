import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InfoMembrePageRoutingModule} from './info-membre-routing.module';

import {InfoMembrePage} from './info-membre.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InfoMembrePageRoutingModule
    ],
    declarations: [InfoMembrePage]
})
export class InfoMembrePageModule {
}
