import {Component} from "@angular/core";

import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
selector: 'date-cell',
template: `{{params.value | date:'MMM dd y hh:mm'}}`
})
export class DateGridTransformer implements ICellRendererAngularComp {
public params: any;

agInit(params: any): void {
this.params = params;
}

refresh(): boolean {
return false;
}
}