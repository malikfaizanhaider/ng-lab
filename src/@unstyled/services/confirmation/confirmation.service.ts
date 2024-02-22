import {inject, Injectable} from '@angular/core';
import {FuseConfirmationConfig} from "./confirmation.types";
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import {FuseConfirmationDialogComponent} from "./dialog/dialog.component";
import {merge} from "lodash-es";

@Injectable({
  providedIn: 'root'
})
export class FuseConfirmationService {

  private _cdkDialog: Dialog = inject(Dialog);
  private _defaultConfig: FuseConfirmationConfig = {
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

  open(config: FuseConfirmationConfig = {}): DialogRef<FuseConfirmationDialogComponent> {
    const userConfig = merge({}, this._defaultConfig, config);
    return this._cdkDialog
      .open(FuseConfirmationDialogComponent, {
        hasBackdrop: true,
        closeOnOverlayDetachments: true,
        autoFocus: true,
        disableClose: !userConfig.dismissible,
        data: userConfig,
        panelClass: 'fuse-confirmation-dialog-panel',
      });
  }
}
