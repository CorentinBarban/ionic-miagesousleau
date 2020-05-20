import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListeMembresPage} from './liste-membres.page';

describe('ListeMembresPage', () => {
    let component: ListeMembresPage;
    let fixture: ComponentFixture<ListeMembresPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListeMembresPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ListeMembresPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
