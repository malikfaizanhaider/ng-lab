import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UnsHorizontalNavigationComponent } from '@unstyled/components/navigation/horizontal/horizontal.component';
import { UnsNavigationService } from '@unstyled/components/navigation/navigation.service';
import { UnsNavigationItem } from '@unstyled/components/navigation/navigation.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'uns-horizontal-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [NgClass],
})
export class UnsHorizontalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
    @Input() item: UnsNavigationItem;
    @Input() name: string;

    private _unsHorizontalNavigationComponent: UnsHorizontalNavigationComponent;
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
        this._unsHorizontalNavigationComponent = this._unsNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._unsHorizontalNavigationComponent.onRefreshed.pipe(
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
}
