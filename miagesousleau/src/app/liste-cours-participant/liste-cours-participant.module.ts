import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListeCoursParticipantPageRoutingModule} from './liste-cours-participant-routing.module';

import {ListeCoursParticipantPage} from './liste-cours-participant.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListeCoursParticipantPageRoutingModule
    ],
    declarations: [ListeCoursParticipantPage]
})
export class ListeCoursParticipantPageModule {
}
