import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListeCoursEnseignantPage} from './liste-cours-enseignant.page';

describe('ListeCoursEnseignantPage', () => {
    let component: ListeCoursEnseignantPage;
    let fixture: ComponentFixture<ListeCoursEnseignantPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListeCoursEnseignantPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ListeCoursEnseignantPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
