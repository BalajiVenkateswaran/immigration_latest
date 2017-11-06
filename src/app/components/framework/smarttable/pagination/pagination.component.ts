import {Component, Input} from '@angular/core';
import {SmartTableFrameworkComponent} from '../smarttable.component';
import {PaginationMetadata} from '../types/pagination-metadata';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'ih-smart-table-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() public smartTable: SmartTableFrameworkComponent;
  @Input() public paginationMetadata: PaginationMetadata = new PaginationMetadata();


  public pageSelectionDisable = false;


  nextPage() {

    this.paginationMetadata.itemStartIndex = this.paginationMetadata.endNumber + 1;
    this.paginationMetadata.pageNumber = this.paginationMetadata.pageNumber + 1;
    console.log(this.paginationMetadata.pageNumber)
    if (this.paginationMetadata.totalPages - 1 === this.paginationMetadata.pageNumber) {
      this.paginationMetadata.endNumber = this.paginationMetadata.totalElements
    } else {
      this.paginationMetadata.endNumber = (this.paginationMetadata.pageNumber + 1) * (this.paginationMetadata.pageSize);
    }

    this.smartTable.queryParameters.setPagination(this.paginationMetadata.pageSize, this.paginationMetadata.pageNumber);
    this.smartTable.invokeResource();

  }

  previousPage() {
    if (this.paginationMetadata.pageNumber === 1) {
      this.paginationMetadata.itemStartIndex = this.paginationMetadata.pageNumber;
    } else {
      this.paginationMetadata.itemStartIndex = (this.paginationMetadata.pageNumber - 1) * (this.paginationMetadata.pageSize) + 1;
    }
    this.paginationMetadata.endNumber = this.paginationMetadata.pageSize * this.paginationMetadata.pageNumber;
    this.paginationMetadata.pageNumber = this.paginationMetadata.pageNumber - 1;

    this.smartTable.queryParameters.setPagination(this.paginationMetadata.pageSize, this.paginationMetadata.pageNumber);
    this.smartTable.invokeResource();
  }

  getPageNumbers(): string[] {

    let pageNumbers: string[] = [];
    for (let i = 1; i < (this.paginationMetadata.totalPages + 1) && i <= 10; i++) {
      pageNumbers.push(i + '');
    }

    if (this.paginationMetadata.totalPages > 10) {
      pageNumbers.push('...');
    }

    return pageNumbers;
  }


  onPageSizeChanged(newPageSize) {
    this.paginationMetadata.pageNumber = 1;
    this.paginationMetadata.pageSize = +newPageSize;
    this.paginationMetadata.itemStartIndex = 1;
    if (this.paginationMetadata.totalElements < this.paginationMetadata.pageSize) {
      this.paginationMetadata.endNumber = this.paginationMetadata.totalElements;
    } else {
      this.paginationMetadata.endNumber = this.paginationMetadata.pageSize;
    }
    this.smartTable.queryParameters.setPagination(this.paginationMetadata.pageSize, this.paginationMetadata.pageNumber);
    this.smartTable.invokeResource();
  }

  gotoPage(pageNo) {

   // this.paginationMetadata.pageNumber = pageNo - 1;
    this.paginationMetadata.pageNumber = pageNo;
    this.paginationMetadata.itemStartIndex = (this.paginationMetadata.pageSize * this.paginationMetadata.pageNumber) + 1;
    if (this.paginationMetadata.totalPages - 1 === this.paginationMetadata.pageNumber) {
      this.paginationMetadata.endNumber = this.paginationMetadata.totalElements
    } else {
      this.paginationMetadata.endNumber = pageNo * this.paginationMetadata.pageSize;
    }

    this.smartTable.queryParameters.setPagination(this.paginationMetadata.pageSize, this.paginationMetadata.pageNumber);
    this.smartTable.invokeResource();
  }
}
