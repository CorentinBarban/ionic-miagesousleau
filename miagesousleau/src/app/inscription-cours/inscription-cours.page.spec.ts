import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InscriptionCoursPage} from './inscription-cours.page';

describe('InscriptionCoursPage', () => {
    let component: InscriptionCoursPage;
    let fixture: ComponentFixture<InscriptionCoursPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InscriptionCoursPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(InscriptionCoursPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
