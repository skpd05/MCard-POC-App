import {Component} from "@angular/core";

import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
selector: 'cardnumber-cell',
template: `{{params.value | creditCardMask:3}}`
})
export class CreditCardGridTransformer implements ICellRendererAngularComp {
public params: any;

agInit(params: any): void {
this.params = params;
}

refresh(): boolean {
return false;
}
}