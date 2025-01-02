import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

import { SearchForm, SearchFormService } from './search-form.service';

describe('SearchFormService', () => {
  let service: SearchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildSearchForm', () => {
    it('should create a SearchForm with the provided searchname', () => {
      const searchname: string = 'Mruczek';
  
      const form: SearchForm = service.buildForm(searchname);
  
      expect(form).toBeInstanceOf(FormGroup);
      expect(form.controls['searchname'].value).toBe(searchname);
    });
  })
});
