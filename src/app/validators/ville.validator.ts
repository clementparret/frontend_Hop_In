import { AbstractControl } from '@angular/forms';

export function VilleValidator(control: AbstractControl) {
  if (!control.value || !control.value.hasOwnProperty('code')) {
    return { invalid: true };
  }
  return null;
}
