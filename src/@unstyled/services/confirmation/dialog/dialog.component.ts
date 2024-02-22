import {NgClass, NgIf} from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, ViewEncapsulation} from '@angular/core';
import {FuseConfirmationConfig} from '@unstyled/services/confirmation/confirmation.types';
import {DIALOG_DATA, DialogModule} from "@angular/cdk/dialog";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'fuse-confirmation-dialog',
  templateUrl: './dialog.component.html',
  styles: [`
    .fuse-confirmation-dialog-panel {
      background-color: var(--uns-panel-background-color);
      padding-inline: var(--uns-spacing-large);
      padding-block: var(--uns-spacing-large);
      border-radius: var(--uns-border-radius-large);
      @screen md {
        @apply w-128;
      }

      .mat-mdc-dialog-container {

        .mat-mdc-dialog-surface {
          padding: 0 !important;
        }
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgIf, DialogModule, NgClass, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuseConfirmationDialogComponent {
  constructor(@Inject(DIALOG_DATA) public data: FuseConfirmationConfig) {
  }
}
