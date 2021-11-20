import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.scss']
})
export class CustomDatatableComponent implements AfterViewInit, OnChanges {
  
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  firstLoad = true;

  @Input() items: any = [];
  @Input() tableOptions: any = null;

  @Output() rowClicked = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sanitized: DomSanitizer){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty('items')) {
      this.dataSource = new MatTableDataSource(this.items??[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.firstLoad = false;
      })
    }

    if(changes.hasOwnProperty('tableOptions')) {
      this.displayedColumns = this.tableOptions.thead.headers.map((a: any) => a.key);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clickedRow(row: any) {
    this.rowClicked.emit(row)
  }

  sanitize(content: any) {
    return this.sanitized.bypassSecurityTrustHtml(content);
  }

}
