import {Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Navigation, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UnstyledDrawerComponent} from "@unstyled/components/drawer";
import {CdkMenu, CdkMenuItem} from "@angular/cdk/menu";
import {UnsVerticalNavigationComponent, UnsNavigationService} from '@unstyled/components/navigation';
import {
  UnsVerticalNavigationGroupItemComponent
} from "@unstyled/components/navigation/vertical/components/group/group.component";
import {
  UnsVerticalNavigationBasicItemComponent
} from "@unstyled/components/navigation/vertical/components/basic/basic.component";
import {UnstyledMediaWatcherService} from "@unstyled/services/media-watcher";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, UnstyledDrawerComponent, CdkMenu, CdkMenuItem, RouterLinkActive, UnsVerticalNavigationComponent, UnsVerticalNavigationGroupItemComponent, UnsVerticalNavigationBasicItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-unstyled';

  navigation: Navigation;

  drawerMode: 'over' | 'side' = 'side';

  drawerOpened: boolean = true;

  /**
   * Flag to check if the screen is small.
   */
  isScreenSmall: boolean;

  /**
   * Subject for unsubscribing all subscriptions.
   */
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _unsNavigationService: UnsNavigationService,
              private _docsMediaWatcherService: UnstyledMediaWatcherService,) {
  }

  ngOnInit(): void {
    this.inits();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Toggle the drawer mode
   */
  toggleDrawerMode(): void {
    this.drawerMode = this.drawerMode === 'side' ? 'over' : 'side';
  }

  /**
   * Toggle the drawer open
   */
  toggleDrawerOpen(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  /**
   * Drawer opened changed
   *
   * @param opened
   */
  drawerOpenedChanged(opened: boolean): void {
    this.drawerOpened = opened;
  }

  private inits(): void {
    this._docsMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({matchingAliases}) => {
        this.isScreenSmall = !matchingAliases.includes('medium');
        console.log('this.isScreenSmall', this.isScreenSmall);

        this.drawerOpened = !this.isScreenSmall;

        
      });
  }
}
