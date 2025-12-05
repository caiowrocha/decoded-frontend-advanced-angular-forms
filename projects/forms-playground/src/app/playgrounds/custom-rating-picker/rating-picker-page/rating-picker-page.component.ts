import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import '@polymer/paper-input/paper-textarea';
import { EditableContentValueAccessor } from '../value-accessor/editable-content.directive';

@Component({
  selector: 'app-rating-picker-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditableContentValueAccessor],
  templateUrl: './rating-picker-page.component.html',
  styleUrls: ['../../common-page.scss', './rating-picker-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RatingPickerPageComponent implements OnInit {
  form = this.fb.group({
    reviewText: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  onSubmit(e: Event): void {
    console.log(this.form.value);
    this.form.reset();
  }
}
