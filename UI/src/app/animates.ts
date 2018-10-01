import {
  trigger,
  animate,
  transition,
  style,
  query
} from '@angular/animations';


export const fadeAnimation = trigger('fadeAnimation', [
  transition('void => *', [
    query(
      ':enter',
      [style({ transform: 'translateX(-100%)', opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      [style({transform: 'translateX(-100%)', opacity: 1 }), animate(900, style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({transform: 'translateX(-100%)', opacity: 0 }), animate(900, style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);
