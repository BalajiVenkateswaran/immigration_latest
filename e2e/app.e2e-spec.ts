import { ImmiportalscssPage } from './app.po';

describe('immiportalscss App', function() {
  let page: ImmiportalscssPage;

  beforeEach(() => {
    page = new ImmiportalscssPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
