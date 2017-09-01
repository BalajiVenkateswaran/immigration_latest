class Pagination {
  //Number of records per page
  size: number;
  //PageNumber
  pageNumber: number;
}

enum SortType {
  asc,
  desc
}

enum FilterOperator {
  Equal = ':',
  GreateThan = '>',
  LessThan = '<'
}

class FilterEntry {
  fieldName: string;
  operator: FilterOperator;
  fieldValue: string;
  constructor(fieldName: string, operator: FilterOperator, fieldValue: string){
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.operator = operator;
  }
}

export class QueryParameters {
  pagination : Pagination;
  sort: Map<string, SortType>;
  filter : Array<FilterEntry>;

  public setPagination(size: number, pageNumber: number) : void{
    if(this.pagination == null){
      this.pagination = new Pagination();
    }
    this.pagination.size = size;
    this.pagination.pageNumber = pageNumber;
  }

  public addFilter(fieldName: string, operator: FilterOperator, fieldValue: string) : void{
    if(this.filter == null){
      this.filter = new Array<FilterEntry>();
    }

    var filterFound : boolean = false;
    //Check for duplicates
    for(var i = 0; i < this.filter.length; i++){
      if(this.filter[i].fieldName === fieldName){
        filterFound = true;
        this.filter[i].fieldValue = fieldValue;
        this.filter[i].operator = operator;
      }
    }

    if(!filterFound){
      this.filter.push(new FilterEntry(fieldName, operator, fieldValue));
    }


  }

}
