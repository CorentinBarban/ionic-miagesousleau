import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListeMembresPageRoutingModule} from './liste-membres-routing.module';

import {ListeMembresPage} from './liste-membres.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListeMembresPageRoutingModule
    ],
    declarations: [ListeMembresPage]
})
export class ListeMembresPageModule {
}
