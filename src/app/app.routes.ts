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
    path: 'auth',
    children: [
      {path: 'login', loadChildren: () => import('app/modules/auth/login/login.routes')},
      {path: 'registration', loadChildren: () => import('app/modules/auth/registration/registration.routes')},
      {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
    ]
  },
  {
    path: 'apps', children: [
      {path: 'chatbot', loadChildren: () => import('app/modules/admin/apps/chat-bot/chat-bot.routes')},
    ]
  },
  {
    path: 'cms', children: [
      {path: 'nav', loadChildren: () => import('app/cms/nav/nav.routs')},
      {path: 'content', loadChildren: () => import('app/cms/content/content.routs')},
    ]
  },
  {
    path: 'lab', children: [
      {path: 'form', loadChildren: () => import('app/modules/playground/form/form.routes')},
    ]
  }
];
