import { AbstractControl, FormControl, Validators } from '@angular/forms';

// Custom validator function
export function numberValidator(control: AbstractControl): { [key: string]: any } | null {
  const pattern = /.*[0-9].*/; // Regular expression to match numbers
  if (pattern.test(control.value)) {
    return null; // Input contains a number, validation succeeds
  } else {
    return { containsNumber: true }; // Input does not contain a number, validation fails
  }
}