import { AbstractControl } from '@angular/forms';

/**
 * Vérifie que le control contient bien une ville valide
 */
export function VilleValidator(control: AbstractControl) {
  if (!control.value || !control.value.hasOwnProperty('code')) {
    return { invalid: true };
  }
  return null;
}
