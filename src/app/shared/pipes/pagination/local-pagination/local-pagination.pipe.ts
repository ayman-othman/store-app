import { Pipe, PipeTransform } from '@angular/core';
import { IPagination } from '../../../../feature/products-store/models/interfaces/pagination.interface';

@Pipe({
  name: 'localPagination',
  standalone: true,
})
export class LocalPaginationPipe implements PipeTransform {
  transform<T>(items: Array<T> | null, config: IPagination): Array<T> | null {
    if (!items || !config) {
      return items;
    }

    const startIndex = (config.pageNumber - 1) * config.perPage;
    return items.slice(startIndex, startIndex + config.perPage);
  }
}
