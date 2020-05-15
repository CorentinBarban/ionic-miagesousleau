import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListeCoursParticipantPage} from './liste-cours-participant.page';

describe('ListeCoursParticipantPage', () => {
    let component: ListeCoursParticipantPage;
    let fixture: ComponentFixture<ListeCoursParticipantPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListeCoursParticipantPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ListeCoursParticipantPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
