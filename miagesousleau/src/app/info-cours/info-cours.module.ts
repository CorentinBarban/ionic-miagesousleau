import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InfoCoursPageRoutingModule} from './info-cours-routing.module';

import {InfoCoursPage} from './info-cours.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InfoCoursPageRoutingModule
    ],
    declarations: [InfoCoursPage]
})
export class InfoCoursPageModule {
}
