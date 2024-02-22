import {Routes} from '@angular/router';
import {ListingComponent} from "./listing/listing.component";
import {AddComponent} from "./add/add.component";
import {ReorderComponent} from "./reorder/reorder.component";
import {ContentComponent} from "./content.component";

export default [
  {
    path: '',
    component: ContentComponent,
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
