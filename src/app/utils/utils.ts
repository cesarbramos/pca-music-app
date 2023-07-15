import { AbstractControl } from "@angular/forms";

export function hasError(control: AbstractControl, type: string): boolean;
export function hasError(field: string, type: string, group:AbstractControl): boolean;

export function hasError(field: AbstractControl | string, type: string, group?:AbstractControl): boolean {
if (field instanceof AbstractControl) {
    return field?.hasError(type) && field?.dirty;
}

return (group?.get(field)?.hasError(type) && group.get(field)?.dirty) ?? false;
}