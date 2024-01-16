import {Component, OnInit, HostListener} from '@angular/core';
import {OverlayModule} from "@angular/cdk/overlay";
import {A11yModule, FocusMonitor, LiveAnnouncer} from "@angular/cdk/a11y";
import {trigger, state, style, animate, transition} from '@angular/animations';

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
export class OverlayComponent implements OnInit {

  isOpen = false;

  constructor(private liveAnnouncer: LiveAnnouncer, private focusMonitor: FocusMonitor) {
  }

  ngOnInit(): void {

  }

  openOverlay() {
    if (this.isOpen) {
      this.closeOverlay();
    } else {
      this.isOpen = true;
      this.liveAnnouncer.announce('Overlay opened', 'polite')
        .then(() => console.log('Announcement made: Overlay opened'));
    }
  }

  closeOverlay() {
    this.isOpen = false;
    this.liveAnnouncer.announce('Overlay closed', 'polite')
      .then(() => console.log('Announcement made: Overlay closed'));
    // Add focus management logic here
  }

  toggleOverlay() {

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
