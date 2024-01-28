import {Inject, Injectable} from '@angular/core';
import {UNSTYLED_CONFIG} from '@unstyled/services/config/config.constants';
import {merge} from 'lodash-es';
import {BehaviorSubject, Observable} from 'rxjs';

/**
 * UnstyledConfigService is a service that provides an interface for managing configuration settings.
 * It uses a BehaviorSubject to hold the current configuration and provides methods to update and reset it.
 *
 * @Injectable({providedIn: 'root'}) - This decorator marks it as a service that can be injected into any part of the application.
 */
@Injectable({providedIn: 'root'})
export class UnstyledConfigService {
  private _config: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {any} config - The initial configuration
   */
  constructor(@Inject(UNSTYLED_CONFIG) config: any) {
    // Private
    this._config = new BehaviorSubject(config);
  }


  /**
   * Setter for config
   * @param {any} value - The new configuration to be merged with the current one
   * @ Accessors
   */
  set config(value: any) {
    // Merge the new config over to the current config
    const config = merge({}, this._config.getValue(), value);

    // Execute the observable
    this._config.next(config);
  }

  /**
   * Getter for config
   * @returns {Observable<any>} - An Observable of the current configuration
   * @ Accessors
   */

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get config$(): Observable<any> {
    return this._config.asObservable();
  }

  /**
   * Resets the config to the default
   * @ Public methods
   */
  reset(): void {
    // Set the config
    this._config.next(this.config);
  }
}
