import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideUnstyled} from "../@unstyled";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideUnstyled({

    })
  ]
};
