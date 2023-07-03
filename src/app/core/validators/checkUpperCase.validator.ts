import { AbstractControl, FormControl, Validators } from '@angular/forms';

// Custom validator function
export function uppercaseValidator(control: AbstractControl): { [key: string]: any } | null {
  const pattern = /.*[A-Z].*/; // Regular expression to match numbers

  if (pattern.test(control.value)) {
    return null; // Input contains a number, validation succeeds
  } else {
    return { containsUppercase: true }; // Input does not contain a number, validation fails
  }
}