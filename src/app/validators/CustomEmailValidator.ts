import { AbstractControl } from "@angular/forms";

const VALID_EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email validator using regex using (RFC 5322 Standard)
 * @param ctrl 
 */
export function emailValidator(ctrl: AbstractControl) {
    if (VALID_EMAIL_REGEX.test(ctrl.value)) return null;

    return { email: true }
}