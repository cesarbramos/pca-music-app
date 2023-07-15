import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Valida si multiples controles de un formGroup tienen el mismo valor
 * @param ctrlNames 
 * @returns 
 */
export function equalsValidator(...ctrlNames: string[]): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!(control instanceof FormGroup) || !ctrlNames || ctrlNames.length < 2) {
            return null;
        }

        let result = true;

        for (let index = 0; index < ctrlNames.length -1; index++) {
            result = result && control?.controls[ctrlNames[index]]?.value == control?.controls[ctrlNames[index+1]]?.value;
        }
        
        return result ? null : { equals: 'Error' };
    };
}