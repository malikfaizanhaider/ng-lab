import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Navigation, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UnstyledDrawerComponent} from "@unstyled/components/drawer";
import {CdkMenu, CdkMenuItem} from "@angular/cdk/menu";
import {FuseVerticalNavigationComponent, FuseNavigationService} from '@unstyled/components/navigation';
import {
  FuseVerticalNavigationGroupItemComponent
} from "../@unstyled/components/navigation/vertical/components/group/group.component";
import {
  FuseVerticalNavigationBasicItemComponent
} from "../@unstyled/components/navigation/vertical/components/basic/basic.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, UnstyledDrawerComponent, CdkMenu, CdkMenuItem, RouterLinkActive, FuseVerticalNavigationComponent, FuseVerticalNavigationGroupItemComponent, FuseVerticalNavigationBasicItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-unstyled';
  navigation: Navigation;

  drawerMode: 'over' | 'side' = 'side';

  drawerOpened: boolean = true;

  constructor(private _fuseNavigationService: FuseNavigationService) {
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
}
