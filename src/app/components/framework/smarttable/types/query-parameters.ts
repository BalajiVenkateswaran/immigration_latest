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
  ':',  
  '>' ,
  '<'
}

class FilterEntry {
  fieldName: string;
  operator:string= FilterOperator.toString();
  fieldValue: string;
  constructor(fieldName: string,operator: string,fieldValue: string){
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.operator = operator;
  }
}

export class QueryParameters {
  pagination : Pagination;
  sort = new Array();
  filter : Array<FilterEntry>;
  filteredString:Array<string>;

  public setPagination(size: number, pageNumber: number) : void{
    if(this.pagination == null){
      this.pagination = new Pagination();
    }
    this.pagination.size = size;
    this.pagination.pageNumber = pageNumber;
  }

  public addFilter(fieldName: string,operator: string, fieldValue: string) : void{
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
      this.filter.push(new FilterEntry(fieldName,operator, fieldValue));
      this.filteredString=this.filter.map(function(item){ return item.fieldName+item.operator+item.fieldValue})
    }


  }
  public addSorting(fieldName:string,sortBy:string){
   /* var sortFound : boolean = false;
    for(var i = 0; i < this.sort.length; i++){
      if(this.sort[i].fieldName === fieldName){
        sortFound = true;
      }
    }
    if(!sortFound){*/
       this.sort.push(fieldName+","+sortBy);
    //}
   
  }

}
