import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { UnsNavigationService } from '@unstyled/components/navigation/navigation.service';
import { UnsNavigationItem } from '@unstyled/components/navigation/navigation.types';
import { UnstyledUtilsService } from '@unstyled/services/utils/utils.service';
import { ReplaySubject, Subject } from 'rxjs';
import { UnsHorizontalNavigationBasicItemComponent } from './components/basic/basic.component';
import { UnsHorizontalNavigationBranchItemComponent } from './components/branch/branch.component';
import { UnsHorizontalNavigationSpacerItemComponent } from './components/spacer/spacer.component';

@Component({
    selector       : 'uns-horizontal-navigation',
    templateUrl    : './horizontal.component.html',
    styleUrls      : ['./horizontal.component.scss'],

    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'unsHorizontalNavigation',
    standalone     : true,
    imports        : [NgFor, NgIf, UnsHorizontalNavigationBasicItemComponent, UnsHorizontalNavigationBranchItemComponent, UnsHorizontalNavigationSpacerItemComponent],
})
export class UnsHorizontalNavigationComponent implements OnChanges, OnInit, OnDestroy
{
    @Input() name: string = this._UnstyledUtilsService.randomId();
    @Input() navigation: UnsNavigationItem[];

    onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _unsNavigationService: UnsNavigationService,
        private _UnstyledUtilsService: UnstyledUtilsService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        // Navigation
        if ( 'navigation' in changes )
        {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Make sure the name input is not an empty string
        if ( this.name === '' )
        {
            this.name = this._UnstyledUtilsService.randomId();
        }

        // Register the navigation component
        this._unsNavigationService.registerComponent(this.name, this);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Deregister the navigation component from the registry
        this._unsNavigationService.deregisterComponent(this.name);

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh the component to apply the changes
     */
    refresh(): void
    {
        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Execute the observable
        this.onRefreshed.next(true);
    }

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
