import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export type SearchForm = FormGroup<{
  searchedText: FormControl<string | null | undefined>;
}>;

@Injectable({
  providedIn: 'root'
})
export class SearchFormService {
  buildForm(searchedText: string | null | undefined): SearchForm {
    return new FormGroup({
      searchedText: new FormControl(
        searchedText,
        {
          nonNullable: true
        })
    });
  }
}
