import { Component, inject, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { SearchForm, SearchFormService } from '../../services/search-form/search-form.service';

@Component({
    selector: 'app-search',
    imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatIconModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  private _searchFormService: SearchFormService = inject(SearchFormService);

  private _searchedText: string = '';

  searchForm: SearchForm = this._searchFormService.buildForm(this._searchedText);

  @Input({required: true})
  searchedText: Observable<string | null | undefined> = new Observable<string | null | undefined>();

  @Output()
  changeSearchedText: EventEmitter<string | null | undefined> = new EventEmitter<string | null | undefined>();

  ngOnInit(): void {
    this.searchedText
      .pipe(takeUntil(this._destroy$)) 
      .subscribe(
        (searchedText) => {
          this.searchForm.controls.searchedText.setValue(searchedText ?? '');
        }
      )
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onChangeSearchedText(): void {
    this.changeSearchedText.emit(this.searchForm.controls.searchedText.value);
  }

  onClearSearchedText(): void {
    this.changeSearchedText.emit('');
  }
}
