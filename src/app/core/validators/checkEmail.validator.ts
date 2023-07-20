import { AbstractControl, FormControl, Validators } from '@angular/forms';

// Custom validator function
export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const pattern =   new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // Regular expression to match numbers
  if (pattern.test(control.value)) {
    return null; // Input contains a number, validation succeeds
  } else {
    return { isMail: true }; // Input does not contain a number, validation fails
  }
}