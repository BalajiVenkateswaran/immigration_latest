export class PaginationMetadata{
  public pageSize: number;
  public totalElements: number;
  public totalPages: number;
  public pageNumber: number = 0;
  public itemStartIndex = 1;
  public endNumber: number;
}