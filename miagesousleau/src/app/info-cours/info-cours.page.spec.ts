import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InfoCoursPage} from './info-cours.page';

describe('InfoCoursPage', () => {
    let component: InfoCoursPage;
    let fixture: ComponentFixture<InfoCoursPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoCoursPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(InfoCoursPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
