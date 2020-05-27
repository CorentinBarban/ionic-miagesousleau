import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InfoMembrePage} from './info-membre.page';

describe('InfoMembrePage', () => {
    let component: InfoMembrePage;
    let fixture: ComponentFixture<InfoMembrePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoMembrePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(InfoMembrePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
