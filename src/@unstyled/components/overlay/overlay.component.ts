import {Component, OnInit, HostListener, OnDestroy} from '@angular/core';

import {trigger, state, style, animate, transition} from '@angular/animations';
import {Subscription} from "rxjs";
import {
  A,
  DOWN_ARROW,
  ENTER,
  hasModifierKey,
  LEFT_ARROW,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
} from '@angular/cdk/keycodes';

import {
  OverlayConfig, OverlayModule,
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  Overlay,
  ScrollStrategy,
} from '@angular/cdk/overlay';

import {ViewportRuler} from '@angular/cdk/scrolling';

import {
  ActiveDescendantKeyManager,
  LiveAnnouncer,
  FocusMonitor,
  addAriaReferencedId,
  removeAriaReferencedId, A11yModule,
} from '@angular/cdk/a11y';


@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [OverlayModule, A11yModule],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class OverlayComponent implements OnInit, OnDestroy {

  isOpen = false;

  private overlayRef: any; // Assuming overlayRef is an instance of OverlayRef or similar
  private overlayAnnouncementSubscription: Subscription | undefined;

  constructor(private liveAnnouncer: LiveAnnouncer, private focusMonitor: FocusMonitor, private overlay: Overlay) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.closeOverlay(); // Ensure the overlay is closed before destroying the component
    this.overlayAnnouncementSubscription?.unsubscribe(); // Unsubscribe if there's a subscription
  }

  openOverlay() {
    if (this.isOpen) {
      this.closeOverlay();
    } else {
      this.isOpen = true;
      const positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
      const overlayRef = this.overlay.create(new OverlayConfig({positionStrategy}));
      this.liveAnnouncer.announce('Overlay opened', 'polite')
        .then(() => console.log('Announcement made: Overlay opened'));
    }
  }

  closeOverlay() {
    this.isOpen = false;
    this.liveAnnouncer.announce('Overlay closed', 'polite')
      .then(() => console.log('Announcement made: Overlay closed'));
    // Add focus management logic here

    // Release overlay-related resources
    if (this.overlayRef) {
      this.overlayRef.dispose(); // Dispose of the overlay when closing
    }
  }

  toggleOverlay() {
    if (this.isOpen) {
      this.closeOverlay();
    } else {
      this.openOverlay();
    }
  }

  // Listen for keyboard events
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeOverlay();
    } else if (event.key === 'Enter') {
      this.openOverlay();
    }
  }

}
