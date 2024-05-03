import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ENVIRONMENT_INITIALIZER, EnvironmentProviders, importProvidersFrom, inject, Provider} from '@angular/core';

import {UnstyledConfig} from '@unstyled/services/config';
import {UNSTYLED_CONFIG} from '@unstyled/services/config/config.constants';
import {unstyledLoadingInterceptor, UnstyledLoadingService} from '@unstyled/services/loading';
import {UnstyledMediaWatcherService} from '@unstyled/services/media-watcher';
import {UnstyledPlatformService} from '@unstyled/services/platform';
import {UnstyledUtilsService} from '@unstyled/services/utils';
import {UnstyledSplashScreenService} from "@unstyled/services/splash-screen";
import {SlDialog} from "@shoelace-style/shoelace";
import {UnsConfirmationService} from "@unstyled/services/confirmation/confirmation.service";


export type UnstyledProviderConfig = {
  unstyled?: UnstyledConfig
}

/**
 * Unstyled provider
 */
export const provideUnstyled = (config: UnstyledProviderConfig): Array<Provider | EnvironmentProviders> => {
  return [
    {
      provide: UNSTYLED_CONFIG,
      useValue: config?.unstyled ?? {},
    },
    importProvidersFrom(SlDialog),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(UnsConfirmationService),
      multi: true,
    },
    provideHttpClient(withInterceptors([unstyledLoadingInterceptor])),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(UnstyledLoadingService),
      multi: true,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(UnstyledMediaWatcherService),
      multi: true,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(UnstyledPlatformService),
      multi: true,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(UnstyledSplashScreenService),
      multi: true,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(UnstyledUtilsService),
      multi: true,
    },
  ];
};
