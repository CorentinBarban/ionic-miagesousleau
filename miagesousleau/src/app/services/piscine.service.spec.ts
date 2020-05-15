import {TestBed} from '@angular/core/testing';

import {PiscineService} from './piscine.service';

describe('PiscineService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: PiscineService = TestBed.get(PiscineService);
        expect(service).toBeTruthy();
    });
});
