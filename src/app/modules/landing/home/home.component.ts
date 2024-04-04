import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA, ElementRef,
  OnDestroy,
  OnInit, ViewChild,
} from '@angular/core';
import {HomeService} from "./home.service";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {CdkCellDef, CdkHeaderCellDef, CdkRowDef, CdkTable} from "@angular/cdk/table";
import {SlTabGroup} from "@shoelace-style/shoelace";

@Component({
  selector: 'app-home',
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('drawer')
  drawer?: ElementRef<SlTabGroup>;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
