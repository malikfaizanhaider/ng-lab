import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OverlayModule} from "@angular/cdk/overlay";
import {A11yModule, FocusMonitor, LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [OverlayModule, A11yModule],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css',
  encapsulation: ViewEncapsulation.None
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

}
