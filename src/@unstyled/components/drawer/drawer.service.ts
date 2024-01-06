import {Injectable} from '@angular/core';
import {UnstyledDrawerComponent} from '@unstyled/components/drawer/drawer.component';

@Injectable({providedIn: 'root'})
export class UnstyledDrawerService {
  private _componentRegistry: Map<string, UnstyledDrawerComponent> = new Map<string, UnstyledDrawerComponent>();

  /**
   * Constructor
   */
  constructor() {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register drawer component
   *
   * @param name
   * @param component
   */
  registerComponent(name: string, component: UnstyledDrawerComponent): void {
    this._componentRegistry.set(name, component);
  }

  /**
   * Deregister drawer component
   *
   * @param name
   */
  deregisterComponent(name: string): void {
    this._componentRegistry.delete(name);
  }

  /**
   * Get drawer component from the registry
   *
   * @param name
   */
  getComponent(name: string): UnstyledDrawerComponent | undefined {
    return this._componentRegistry.get(name);
  }
}
