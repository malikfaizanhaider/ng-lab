import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UnsNavigationService } from '@unstyled/components/navigation/navigation.service';
import { UnsNavigationItem } from '@unstyled/components/navigation/navigation.types';
import { UnsVerticalNavigationBasicItemComponent } from '@unstyled/components/navigation/vertical/components/basic/basic.component';
import { UnsVerticalNavigationCollapsableItemComponent } from '@unstyled/components/navigation/vertical/components/collapsable/collapsable.component';
import { UnsVerticalNavigationDividerItemComponent } from '@unstyled/components/navigation/vertical/components/divider/divider.component';
import { UnsVerticalNavigationSpacerItemComponent } from '@unstyled/components/navigation/vertical/components/spacer/spacer.component';
import { UnsVerticalNavigationComponent } from '@unstyled/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'uns-vertical-navigation-group-item',
    templateUrl    : './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [NgClass, NgIf, MatIconModule, NgFor, UnsVerticalNavigationBasicItemComponent, UnsVerticalNavigationCollapsableItemComponent, UnsVerticalNavigationDividerItemComponent, forwardRef(() => UnsVerticalNavigationGroupItemComponent), UnsVerticalNavigationSpacerItemComponent],
})
export class UnsVerticalNavigationGroupItemComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_autoCollapse: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() autoCollapse: boolean;
    @Input() item: UnsNavigationItem;
    @Input() name: string;

    private _unsVerticalNavigationComponent: UnsVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _unsNavigationService: UnsNavigationService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._unsVerticalNavigationComponent = this._unsNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._unsVerticalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe(() =>
        {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
