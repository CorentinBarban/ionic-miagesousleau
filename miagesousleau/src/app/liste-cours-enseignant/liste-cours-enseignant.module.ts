import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListeCoursEnseignantPageRoutingModule} from './liste-cours-enseignant-routing.module';

import {ListeCoursEnseignantPage} from './liste-cours-enseignant.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListeCoursEnseignantPageRoutingModule
    ],
    declarations: [ListeCoursEnseignantPage]
})
export class ListeCoursEnseignantPageModule {
}
