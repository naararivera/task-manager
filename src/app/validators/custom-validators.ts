import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notOnlySpaces(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  return value.trim().length === 0 ? { notOnlySpaces: true } : null;
}