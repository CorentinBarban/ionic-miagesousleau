import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListeCoursParticipantPage} from './liste-cours-participant.page';

const routes: Routes = [
    {
        path: '',
        component: ListeCoursParticipantPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListeCoursParticipantPageRoutingModule {
}
