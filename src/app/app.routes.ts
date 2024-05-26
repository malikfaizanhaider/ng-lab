import {Routes} from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {
        path: '',
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/landing/home/home.routes'),
                data: {bodyClass: 'home-page'}
            },
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                loadChildren: () => import('app/modules/auth/login/login.routes'),
                data: {bodyClass: 'auth-page'}
            },
            {
                path: 'registration',
                loadChildren: () => import('app/modules/auth/registration/registration.routes'),
                data: {bodyClass: 'auth-page'}
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes'),
                data: {bodyClass: 'auth-page'}
            },
        ]
    },
    {
        path: 'apps',
        children: [
            {
                path: 'chatbot',
                loadChildren: () => import('app/modules/admin/apps/chat-bot/chat-bot.routes'),
                data: {bodyClass: 'apps-page'}
            },
        ]
    },
    {
        path: 'cms',
        children: [
            {path: 'nav', loadChildren: () => import('app/cms/nav/nav.routs'), data: {bodyClass: 'cms-page'}},
            {
                path: 'content',
                loadChildren: () => import('app/cms/content/content.routs'),
                data: {bodyClass: 'cms-page'}
            },
        ]
    },
    {
        path: 'lab',
        children: [
            {
                path: 'form',
                loadChildren: () => import('app/modules/playground/form/form.routes'),
                data: {bodyClass: 'lab-page-form'}
            },
            {
                path: 'gsap',
                loadChildren: () => import('app/modules/playground/gsap/gsap.routes'),
                data: {bodyClass: 'lab-page-gsap'}
            },
        ]
    }
];
