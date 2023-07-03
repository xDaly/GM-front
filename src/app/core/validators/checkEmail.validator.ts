import { AbstractControl, FormControl, Validators } from '@angular/forms';

// Custom validator function
export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const pattern =  new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'); // Regular expression to match numbers
  if (pattern.test(control.value)) {
    return null; // Input contains a number, validation succeeds
  } else {
    return { isMail: true }; // Input does not contain a number, validation fails
  }
}