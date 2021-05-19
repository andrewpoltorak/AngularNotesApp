import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[userUniqueValid]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UserUniqueValidatorDirective, multi: true}]
})
export class UserUniqueValidatorDirective implements Validator{

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Promise<{[key: string]: any} | null> {
    const user = control.value;
    return new Promise(resolve =>
      this.http.get<boolean>('checkUserUnique', {params: {user}}).subscribe(res =>
        res ? resolve(null): resolve({userNotUnique: true})))
  }
}
