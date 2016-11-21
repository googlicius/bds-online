import { BdsOnlineManagePage } from './app.po';

describe('bds-online-manage App', function() {
  let page: BdsOnlineManagePage;

  beforeEach(() => {
    page = new BdsOnlineManagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
