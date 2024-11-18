import { PagePaginationPipe } from "./page-pagination.pipe";

describe('PagePaginationPipe', () => {
  it('create an instance', () => {
    const pipe = new PagePaginationPipe();
    expect(pipe).toBeTruthy();
  });
});
