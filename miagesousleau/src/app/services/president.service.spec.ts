import {TestBed} from '@angular/core/testing';

import {PresidentService} from './president.service';

describe('PresidentService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: PresidentService = TestBed.get(PresidentService);
        expect(service).toBeTruthy();
    });
});
