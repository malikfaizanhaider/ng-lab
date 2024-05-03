import {inject, Injectable} from '@angular/core';
import {UnsConfirmationConfig} from "./confirmation.types";
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import {UnsConfirmationDialogComponent} from "./dialog/dialog.component";
import {merge} from "lodash-es";

@Injectable({
  providedIn: 'root'
})
export class UnsConfirmationService {

  private _cdkDialog: Dialog = inject(Dialog);
  private _defaultConfig: UnsConfirmationConfig = {
    title: 'Confirm action',
    message: 'Are you sure you want to confirm this action?',
    icon: {
      show: true,
      name: 'heroicons_outline:exclamation-triangle',
      color: 'warn',
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirm',
        color: 'warn',
      },
      cancel: {
        show: true,
        label: 'Cancel',
      },
    },
    dismissible: false,
  };

  constructor() {
  }

  open(config: UnsConfirmationConfig = {}): DialogRef<UnsConfirmationDialogComponent> {
    const userConfig = merge({}, this._defaultConfig, config);
    return this._cdkDialog
      .open(UnsConfirmationDialogComponent, {
        hasBackdrop: true,
        closeOnOverlayDetachments: true,
        autoFocus: true,
        disableClose: !userConfig.dismissible,
        data: userConfig,
        panelClass: 'uns-confirmation-dialog-panel',
      });
  }
}
