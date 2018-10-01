import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
    selector: '[validateEmail][formControlName],[validateEmail][formControl],[validateEmail][ngModel]',
    providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }]
})
export class EmailValidator implements Validator{
    
    validate(control: AbstractControl): ValidationResult {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (control.value && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { validateEmail: false };
        } else {
            if (control.errors) delete control.errors['validateEmail'];
            if (control.errors && !Object.keys(control.errors).length) control.setErrors(null);
        }

        return null;
    }

}


interface ValidationResult {
    [key: string]: boolean;
}