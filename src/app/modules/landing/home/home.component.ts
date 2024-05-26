import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {HomeService} from "./home.service";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {CdkCellDef, CdkHeaderCellDef, CdkRowDef, CdkTable} from "@angular/cdk/table";

@Component({
    selector: '[app-home]',
    standalone: true,
    imports: [
        NgForOf,
        CdkTable,
        CdkRowDef,
        CdkHeaderCellDef,
        CdkCellDef,
        NgTemplateOutlet,
        NgIf,
        NgClass,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    providers: [HomeService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
