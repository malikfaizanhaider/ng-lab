import { Component } from '@angular/core';
import {HomeService} from "./home.service";
import {Root} from "./types";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {CdkCellDef, CdkHeaderCellDef, CdkRowDef, CdkTable} from "@angular/cdk/table";
import {AgGridAngular} from "ag-grid-angular";

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
    AgGridAngular
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [HomeService]
})
export class HomeComponent {
  rowData: any[];

  columnDefs = [
    { field: 'name' },
    { field: 'perma_link' },
    { field: 'nav_parent' },
    { field: 'title' },
    { field: 'nav_type' },
    { field: 'created_by_fname' },
    { field: 'last_updated_by_fname' },
    { field: 'added_on' },
    { field: 'last_updated_on' },
    { field: 'is_active' },
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 150,
  };

  data: any;
  total: number = 0;

  constructor(private homeService: HomeService) {
    this.getData();
    this.rowData = this.createRowData();
  }

  getData() {
    this.homeService.getData().subscribe((resp: Root) => {
      this.data = resp?.data;

      this.rowData = this.data?.data;
    });
  }

  createRowData() {
    const rowData: any[] = [];
    for (let i = 0; i < 100; i++) {
      rowData.push({
        name: 'Name ' + i,
        perma_link: 'Perma Link ' + i,
        nav_parent: 'Nav Parent ' + i,
        title: 'Title ' + i,
        nav_type: 'Nav Type ' + i,
        created_by_fname: 'Created By Fname ' + i,
        last_updated_by_fname: 'Last Updated By Fname ' + i,
        added_on: 'Added On ' + i,
        last_updated_on: 'Last Updated On ' + i,
        is_active: 'Is Active ' + i,
      });
    }
    return rowData;
  }
}
