import { AbstractControl, ValidatorFn } from "@angular/forms";

// Custom Valdation way-1:

//  export function forbiddenNameValidator(control: AbstractControl):{[key: string]: any | null} {
//   const forbidden = /admin/.test(control.value);
//   return forbidden ? {'forbiddenName': {value : control.value}} : null ;
// }

// Custom Valdation way-2:

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
  const forbidden = forbiddenName.test(control.value);
  return forbidden ? {forbiddenName: {value : control.value}} : null ;
};
}
