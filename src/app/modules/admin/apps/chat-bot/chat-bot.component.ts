import {Component} from '@angular/core';
import {UnstyledDrawerComponent} from "@unstyled/components/drawer";
import {UnsScrollbarDirective} from "@unstyled/directives/scrollbar";
import {NgForOf} from "@angular/common";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

/**
 * This is a component for a chatbot.
 * It has a drawer that can be toggled open and closed, and can switch between 'side' and 'over' modes.
 * It also contains an array of numbers from 1 to 100.
 */
@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [
    UnstyledDrawerComponent,
    UnsScrollbarDirective,
    NgForOf,
    CdkTextareaAutosize,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf
  ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {

  // An array of numbers from 1 to 100
  numbers = Array.from({length: 50}, (_, i) => i + 1);

  // The mode of the drawer, can be 'side' or 'over'
  drawerMode = 'side';

  // The mode of the drawer, can be 'side' or 'over'
  drawerOpened = true;

  /**
   * Toggle the drawer mode between 'side' and 'over'
   */
  toggleDrawerMode(): void {
    this.drawerMode = this.drawerMode === 'side' ? 'over' : 'side';
  }

  /**
   * Toggle the drawer open or closed
   */
  toggleDrawerOpen() {
    this.drawerOpened = !this.drawerOpened;
  }

  /**
   * Update the drawer opened state when it changes
   *
   * @param opened - The new state of the drawer
   */
  drawerOpenedChanged(opened: boolean): void {
    this.drawerOpened = opened;
  }
}
