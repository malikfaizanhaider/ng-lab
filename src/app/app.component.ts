import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UnstyledDrawerComponent} from "@unstyled/components/drawer";
import {CdkMenu, CdkMenuItem} from "@angular/cdk/menu";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, UnstyledDrawerComponent, CdkMenu, CdkMenuItem, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-unstyled';
}
