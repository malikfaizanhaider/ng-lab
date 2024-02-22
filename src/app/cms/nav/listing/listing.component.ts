import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavService} from "../nav.service";
import {isPlatformBrowser} from "@angular/common";
import {catchError, of} from "rxjs";
import {Daum, NavChildren, Root} from "../../../modules/landing/home/types";
import {AgGridAngular} from "ag-grid-angular";

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    AgGridAngular
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit {
  data: any;
  gridOptions: any;
  deleteRow: boolean = false;
  selection: string | null = null;

  defaultColDef = {
    flex: 1,
    minWidth: 200,
    resizable: false,
    wrapText: false,
    sortable: false,
  };

  constructor(private service: NavService,
              @Inject(PLATFORM_ID) private platformId: any,) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getData();
      this.gridOptions.getGridOption();
    }
  }


  getData() {
    this.service.getData()
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching data', error);
          return of(null);
        })
      )
      .subscribe({
        next: (response: Root) => {
          if (response?.data) {
            this.data = this.processData(response.data);
            this.gridOptions = {
              columnDefs: [
                {
                  headerName: 'Navigation Name',
                  field: 'name',
                  pinned: 'left',
                  checkboxSelection: true,
                  width: 325,
                  wrapText: false,
                  cellStyle: params => {
                    if (params.data.nav_parent === null || params.data.nav_parent === '-' || params.data.nav_children.length > 0) {
                      return {
                        'font-weight': 'bold',
                      };
                    }

                    if (params.data.nav_parent !== null) {
                      return {
                        'color': 'var(--i2c-color-warning-500)',
                      };
                    }

                    return null;
                  },
                },
                {
                  field: 'perma_link',
                  headerName: 'Permalink',
                  width: 225,
                },
                {
                  field: 'nav_parent',
                  headerName: 'Nav Parent',
                },
                {
                  field: 'title',
                  headerName: 'Title',
                },
                {
                  field: 'nav_type',
                  headerName: 'Nav Type',
                },
                {
                  field: 'created_by_fname',
                  headerName: 'Created By',
                  valueFormatter: (params: any) => `${params.data.created_by_fname} ${params.data.created_by_lname}`,
                },
                {
                  field: 'last_updated_by_fname',
                  width: 100,
                  headerName: 'Updated By',
                  valueFormatter: (params: any) => {
                    const {last_updated_by_fname, last_updated_by_lname} = params.data;
                    const value = `${last_updated_by_fname || ''} ${last_updated_by_lname || ''}`.trim();
                    return value ? value : '-';
                  }
                },
                {
                  field: 'added_on',
                  headerName: 'Updated On',
                },
                {
                  field: 'last_updated_on',
                  headerName: 'Updated On',
                },
                {
                  field: 'is_active',
                  headerName: 'Status',
                }
              ],
              rowSelection: 'single',
              rowData: this.processData(this.data),
              defaultColDef: this.defaultColDef,
              getRowStyle: function (params) {
                if (params.data.nav_parent === null || params.data.nav_parent === '-') {
                  return {
                    background: 'lightgray',
                  };
                }
                return null;
              },
              onRowSelected: this.onRowSelected,
              onSelectionChanged: this.onSelectionChanged,
            };
          }
        },
        error: (error: any) => {
          console.error('Error fetching data', error);
        },
        complete: () => {
        }
      });
  }

  processData(data: Daum[]): any[] {
    const flattenTree = (item: NavChildren): any[] => {
      let result = [item];
      if (item.nav_children) {
        item.nav_children.forEach(child => {
          result = [...result, ...flattenTree(child)];
        });
      }
      return result;
    };

    return data.flatMap(parent => flattenTree(parent));
  }

  onRowSelected(event: any) {
    const selectedRow = event.node.data; // Access the selected row data
    this.getRowData(selectedRow)
  }

  onSelectionChanged(event: any) {
    const selectedRows = this.gridOptions.api.getSelectedRows(event);
    this.getRowData(selectedRows);
  }

  /**
   * @method getRowData
   * @param data
   * @returns {string}
   * @description Gets the data of the selected row.
   */
  getRowData(data?: any): string {
    this.selection = data;
    console.log('Selected Row Data:', this.selection);
    return this.selection;
  }

  calculateLevels(data: Daum[]): { [parentId: string]: number } {
    const levels: { [parentId: string]: number } = {};

    const calculate = (items: NavChildren[], level: number = 0, parentId: string = null) => {
      items.forEach(item => {
        if (!levels[item.nav_parent] || level > levels[item.nav_parent]) {
          levels[item.nav_parent] = level;
        }
        if (item.nav_children) {
          calculate(item.nav_children, level + 1, item.numbr);
        }
      });
    };

    calculate(data);
    return levels;
  }

}
