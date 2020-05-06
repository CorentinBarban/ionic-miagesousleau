import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InscriptionCoursPageRoutingModule} from './inscription-cours-routing.module';

import {InscriptionCoursPage} from './inscription-cours.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InscriptionCoursPageRoutingModule
    ],
    declarations: [InscriptionCoursPage]
})
export class InscriptionCoursPageModule {
}
