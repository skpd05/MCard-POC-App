import { Component, HostListener } from '@angular/core';
import {
  transition,trigger,query,style,animate,group,animateChild
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateY(90rem) rotate(-10deg)'
              }),
              animate(
                '0.35s cubic-bezier(0, 1.8, 1, 1.8)',
                style({ opacity: 1, transform: 'translateY(0) rotate(0)' })
              ),
              animateChild()
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [animate('0.35s', style({ opacity: 0 })), animateChild()],
            { optional: true }
          )
        ])
      ])
    ])
  ]

})
export class AppComponent {
  title = 'poc';
  getPage(outlet) {
  return outlet.activatedRouteData['page'] || 'one';
}

/*@HostListener('window:beforeunload', ['$event'])
public doSomething($event) {
    localStorage.clear();
    return "true";
}*/
}
