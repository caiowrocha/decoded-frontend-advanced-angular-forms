import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueNicknameValidator implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl<string | null>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const url = `https://jsonplaceholder.typicode.com/users?username${control?.value}`;

    const error = {
      uniqueNickName: {
        isTaken: true,
      },
    };

    const errorFallback = {
      uniqueNickName: {
        unknownError: true,
      },
    };

    return this.http.get<unknown[]>(url).pipe(
      map((users) => (users?.length === 0 ? null : error)),
      catchError(() => of(errorFallback))
    );
  }
}
