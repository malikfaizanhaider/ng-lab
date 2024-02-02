import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: '',
    children: [
      {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
    ]
  },
  {
    path: 'apps', children: [
      {path: 'chatbot', loadChildren: () => import('app/modules/admin/apps/chat-bot/chat-bot.routes')},
    ]
  }
];
