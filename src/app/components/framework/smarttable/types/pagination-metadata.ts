export class PaginationMetadata {
  public pageSize: number;
  public totalElements: number;
  public totalPages: number;
  public pageNumber: number = 1;
  public itemStartIndex = 1;
  public endNumber: number;

  public isPaginationEmpty(): boolean {
    return this.pageSize === undefined && this.totalElements === undefined && this.totalPages === undefined
      && this.pageNumber === 1 && this.itemStartIndex === 1 && this.endNumber === undefined;
  }

}
