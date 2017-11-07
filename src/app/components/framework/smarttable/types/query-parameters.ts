export class Pagination {
  // Number of records per page
  size: number;
  // PageNumber
  pageNumber: number;
}

export enum SortType {
  ASC, DESC
}

enum FilterOperator {
  ':',
  '>' ,
  '<'
}

export class FilterEntry {
  fieldHeader: string;
  fieldName: string;
  operator: string = FilterOperator.toString();
  fieldValue: string;
  constructor(headerName: string, fieldName: string, operator: string, fieldValue: string) {
    this.fieldHeader = headerName;
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.operator = operator;
  }
}

/**
 * Class to manage the information used to query data. It has 3 parts
 *  1. paginaton
 *  2. sort
 *  3. filter - Applied filters
 *
 */
export class QueryParameters {
  pagination: Pagination;
  sort: Map<string, SortType>;
  filter: Array<FilterEntry>;

  public setPagination(size: number, pageNumber: number): void {
    if (this.pagination == null) {
      this.pagination = new Pagination();
    }
    this.pagination.size = size;
    this.pagination.pageNumber = pageNumber;
  }

  public addFilter(fieldHeader: string, fieldName: string, operator: string, fieldValue: string): void {
    if (this.filter == null) {
      this.filter = new Array<FilterEntry>();
    }

    let filterFound = false;

    if (fieldHeader == null) {
      fieldHeader = fieldName;
    }

    // Check for duplicates
    for (let i = 0; i < this.filter.length; i++) {
      if (this.filter[i].fieldName === fieldName) {
        filterFound = true;
        this.filter[i].fieldHeader = fieldHeader;
        this.filter[i].fieldValue = fieldValue;
        this.filter[i].operator = operator;
      }
    }

    if (!filterFound) {
      this.filter.push(new FilterEntry(fieldHeader, fieldName, operator, fieldValue));
    }
  }

  public addFilters(filters: Array<FilterEntry>) {
    if (this.filter == null) {
      this.filter = new Array<FilterEntry>();
    }
    this.filter.concat(filters);
  }

  public addSort(fieldName: string, sortBy: SortType) {
    if (this.sort == null) {
      this.sort = new Map<string, SortType>();
    }

    this.sort.set(fieldName, sortBy);
  }
}
