import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { PagePaginationPipe } from '../../pipes/pagination/page-pagination/page-pagination.pipe';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule, PagePaginationPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  // Inputs
  public totalItems: InputSignal<number> = input.required<number>();
  public itemsPerPage: InputSignal<number> = input.required<number>();
  public currentPage: InputSignal<number> = input.required<number>();
  // Outputs
  @Output('selectedPage') selectedPage = new EventEmitter<number>();

  public onPageChange(pageNumber: number): void {
    this.selectedPage.emit(pageNumber);
  }
}
