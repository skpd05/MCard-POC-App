import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardMask'
})
export class CreditCardMaskPipe implements PipeTransform {
  maskString="(?:5[\ -]*[1-5](?:[\ -]*\d){2}|(?:2[\
    -]*){3}[1-9]|(?:2[\ -]*){2}[3-9][\ -]*\d|2[\ -]* [3-6](?:[\ -]*\d){2}|2[\
    -]*7[\ -]*[01][\ -]*\d|2[\ -]*7[\ -]*2[\ -]*0)(?:[\ -]*\d)"

  transform(plainCreditCard: string, visibleDigits: number = 4): string {
    //const visibleDigits = 4;
    let part1 = plainCreditCard.slice(0,6);
    let maskedSection = plainCreditCard.slice(7, 13);
    let visibleSection = plainCreditCard.slice(12);

    return part1+maskedSection.replace(/./g, '*') + visibleSection;
  }
}