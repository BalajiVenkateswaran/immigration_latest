
export class PaginationUtil {
  public static constructRequest(queryData: string): any {
    let size, page, filter, sortField, sortOrder;

    if (queryData) {
      let queryDataSplit = queryData.split('&');

      for (let queryParam of queryDataSplit) {
        if ( queryParam.startsWith('?') ) {
          queryParam = queryParam.substring(1);
        }

        if (queryParam.startsWith('size=')) {
          size = queryParam.substring(5);
        } else if (queryParam.startsWith('page=')) {
          page = queryParam.substring(5);
        } else if (queryParam.startsWith('filter=')) {
          filter = queryParam.substring(7);
        } else if (queryParam.startsWith('sort=')) {
          let sort = queryParam.substring(5);
          let sortSplit = sort.split(',');
          sortField = sortSplit[0];
          sortOrder = sortSplit[1];
        }
      }
    }



    let request = {
       pagination : {
        size : size,
        page: page
      },
      sort : {
        field: sortField,
        order: sortOrder
      },
      filter : filter
    };
    return request;
  }
}
