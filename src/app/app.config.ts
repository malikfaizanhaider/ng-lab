import {ApplicationConfig} from '@angular/core';
import {PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading} from '@angular/router';

import {routes} from './app.routes';
import {provideUnstyled} from "@unstyled";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'})),
    provideUnstyled({
      unstyled: {
        layout: 'classy',
        scheme: 'light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme: 'theme-default',
        themes: [
          {
            id: 'theme-default',
            name: 'Default',
          },
          {
            id: 'theme-brand',
            name: 'Brand',
          },
          {
            id: 'theme-teal',
            name: 'Teal',
          },
          {
            id: 'theme-rose',
            name: 'Rose',
          },
          {
            id: 'theme-purple',
            name: 'Purple',
          },
          {
            id: 'theme-amber',
            name: 'Amber',
          },
        ],
      },
    })
  ]
};
