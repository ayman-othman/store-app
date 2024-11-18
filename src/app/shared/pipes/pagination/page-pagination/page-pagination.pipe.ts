import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagePagination',
  standalone: true,
})
export class PagePaginationPipe implements PipeTransform {
  transform(
    totalItems: number,
    itemsPerPage: number
  ): Array<{ label: string; value: number }> {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagesArray: Array<{ label: string; value: number }> = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      pagesArray.push({ label: pageNumber.toString(), value: pageNumber });
    }

    return pagesArray;
  }
}
