import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './reactive-forms-page.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsPageComponent implements OnInit {
  phoneLabels = ['Mobile', 'Home', 'Work'];

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    nickName: new FormControl(''),
    email: new FormControl(''),
    yearOfBirth: new FormControl(''),
    passport: new FormControl(''),
    address: new FormGroup({
      fullAddress: new FormControl(''),
      city: new FormControl(''),
      postCode: new FormControl(''),
    }),
    phones: new FormArray([
      new FormGroup({
        phone: new FormControl(''),
        label: new FormControl(this.phoneLabels[0]),
      }),
    ]),
  });

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  constructor() {}

  ngOnInit(): void {}

  addPhone() {
    // this.form.controls.phones.push(new FormGroup({
    //   phone: new FormControl(''),
    //   label: new FormControl(''),
    // }));
    this.form.controls.phones.insert(
      0,
      new FormGroup({
        phone: new FormControl(''),
        label: new FormControl(this.phoneLabels[0]),
      })
    );
  }

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }

  onSubmit(event: Event) {
    console.log(this.form.value);
  }
}
