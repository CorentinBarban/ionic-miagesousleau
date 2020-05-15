import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreerCoursPageRoutingModule} from './creer-cours-routing.module';

import {CreerCoursPage} from './creer-cours.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreerCoursPageRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [CreerCoursPage]
})
export class CreerCoursPageModule {
}
