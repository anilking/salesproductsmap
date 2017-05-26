import { SalesproductsmapPage } from './app.po';

describe('salesproductsmap App', () => {
  let page: SalesproductsmapPage;

  beforeEach(() => {
    page = new SalesproductsmapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
