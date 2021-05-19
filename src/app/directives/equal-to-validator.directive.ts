import { Attribute, Directive, OnDestroy } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[validateEqual]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualToValidatorDirective, multi: true }]
})

export class EqualToValidatorDirective implements OnDestroy {

  subscription?: Subscription;

  constructor(@Attribute("validateEqual") public validateEqual: string) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  validate(c: AbstractControl): { [key: string]: any } | null {
    const e = c.root.get(this.validateEqual);
    if (!this.subscription) {
      this.subscription = e?.valueChanges.subscribe((val: string) => {
        if (val !== c.value) {
          c.setErrors({ validateEqual: true });
        } else {
          c.setErrors(null);
        }
      });
    }

    if (e && c.value !== e.value) {
      return { validateEqual: true };
    }
    return null;
  }
}