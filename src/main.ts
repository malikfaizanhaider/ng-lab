import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  key: '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',
};


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
