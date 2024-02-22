import {Routes} from '@angular/router';
import {NavComponent} from "./nav.component";
import {ListingComponent} from "./listing/listing.component";
import {AddComponent} from "./add/add.component";
import {ReorderComponent} from "./reorder/reorder.component";

export default [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ListingComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'reorder',
        component: ReorderComponent,
      }
    ],
  },
] as Routes;
