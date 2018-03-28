import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zz-pagination-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination-footer.component.html',
  styleUrls: ['./pagination-footer.component.scss'],
})
export class PaginationFooterComponent {
  pages: Number[];

  @Input()
  query: any;

  @Input()
  set total(total: number) {
    if (total) {
      const pages = Math.ceil(total / this.query.limit);
      this.pages = new Array(pages).fill(null).map((_, i) => i + 1);
    }
  }

  @Output()
  search = new EventEmitter();

  limits = [5, 10, 15];

  changeLimit(limit) {
    limit = parseInt(limit, 10);
    const currentOffset = (this.query.page - 1) * this.query.limit;
    const page = Math.floor(currentOffset / limit) + 1;
    this.search.emit({ limit, page });
  }

  paginate(page) {
    this.search.emit({ page: parseInt(page, 10) });
  }
}
