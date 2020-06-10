import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {PayerCotisationPage} from './payer-cotisation.page';

describe('PayerCotisationPage', () => {
    let component: PayerCotisationPage;
    let fixture: ComponentFixture<PayerCotisationPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PayerCotisationPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(PayerCotisationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
