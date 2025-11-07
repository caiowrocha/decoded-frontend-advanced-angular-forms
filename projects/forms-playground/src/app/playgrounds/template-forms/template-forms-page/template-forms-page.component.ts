import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../../core/user-info';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './template-forms-page.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormsPageComponent implements OnInit {
  userInfo: UserInfo = {
    firstName: 'Dmytro',
    lastName: '',
    nickname: '',
    email: '',
    yearOfBirth: 0,
    passport: '',
    fullAddress: '',
    city: '',
    postCode: 0,
  };

  constructor() {}

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  ngOnInit(): void {}

  onSubmitForm(form: NgForm, e: SubmitEvent) {
    console.log('The form has been submitted', form.value);
    this.userInfo = {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      yearOfBirth: 0,
      passport: '',
      fullAddress: '',
      city: '',
      postCode: 0,
    };
    // console.log('The native submit event', e);
  }
}
