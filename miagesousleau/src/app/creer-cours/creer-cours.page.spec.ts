import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CreerCoursPage} from './creer-cours.page';

describe('CreerCoursPage', () => {
    let component: CreerCoursPage;
    let fixture: ComponentFixture<CreerCoursPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreerCoursPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CreerCoursPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
